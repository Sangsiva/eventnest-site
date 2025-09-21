import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendContactInquiryEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, vendorSlug } = body

    console.log('Received contact inquiry:', { name, phone, vendorSlug })

    if (!name || !phone || !vendorSlug) {
      console.log('Missing required fields:', { name: !!name, phone: !!phone, vendorSlug: !!vendorSlug })
      return NextResponse.json(
        { error: 'Name, phone, and vendorSlug are required' },
        { status: 400 }
      )
    }

    // Check all vendors first
    try {
      const allVendors = await prisma.vendor.findMany({
        select: { slug: true, name: true }
      })
      console.log('All vendors in database:', allVendors.map(v => ({ slug: v.slug, name: v.name })))
    } catch (dbError) {
      console.error('Database error when fetching all vendors:', dbError)
    }

    // Find the vendor by slug to get vendor details
    const vendor = await prisma.vendor.findUnique({
      where: { slug: vendorSlug },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })

    console.log('Vendor lookup result for slug:', vendorSlug, 'Result:', vendor)

    if (!vendor) {
      console.log('Vendor not found for slug:', vendorSlug)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Create the contact inquiry
    const contactInquiry = await prisma.contactInquiry.create({
      data: {
        name,
        phone,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorSlug: vendor.slug,
        inquiryType: 'booking',
        status: 'new'
      }
    })

    // Send email notification (currently just logs, doesn't send)
    try {
      await sendContactInquiryEmail({
        name,
        phone,
        vendorName: vendor.name,
        vendorSlug: vendor.slug,
        inquiryId: contactInquiry.id
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Contact inquiry submitted successfully',
      inquiryId: contactInquiry.id
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating contact inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact inquiry' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const contactInquiries = await prisma.contactInquiry.findMany({
      include: {
        vendor: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(contactInquiries)
  } catch (error) {
    console.error('Error fetching contact inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact inquiries' },
      { status: 500 }
    )
  }
}
