import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        category: true,
        location: true,
        services: true,
        reviews: true,
        portfolio: true
      },
      where: {
        isActive: true
      }
    })

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, categoryId, locationId, description } = body

    const vendor = await prisma.vendor.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        email,
        phone,
        categoryId,
        locationId,
        description,
        isActive: true
      },
      include: {
        category: true,
        location: true
      }
    })

    return NextResponse.json(vendor, { status: 201 })
  } catch (error) {
    console.error('Error creating vendor:', error)
    return NextResponse.json(
      { error: 'Failed to create vendor' },
      { status: 500 }
    )
  }
}
