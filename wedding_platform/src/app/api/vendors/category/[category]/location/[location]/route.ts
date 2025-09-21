import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { category: string; location: string } }) {
  try {
    // Get the category
    const category = await prisma.category.findUnique({
      where: { slug: params.category }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // For now, return all vendors for this category to debug
    // Later we can add location filtering
    const vendors = await prisma.vendor.findMany({
      where: {
        categoryId: category.id,
        isActive: true
      },
      include: {
        category: true,
        location: true,
        services: true,
        reviews: true,
        portfolio: true
      },
      orderBy: {
        rating: 'desc'
      }
    })

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors by category and location:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}
