import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { vendor: string } }) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { slug: params.vendor },
      include: {
        category: true,
        location: true,
        services: true,
        packages: true,
        reviews: true,
        portfolio: true
      }
    })

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return NextResponse.json({ error: 'Failed to fetch vendor' }, { status: 500 })
  }
}
