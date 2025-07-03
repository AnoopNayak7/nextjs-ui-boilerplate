import { NextRequest, NextResponse } from 'next/server';
import { propertiesApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    // Extract search query and filters from URL parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const status = searchParams.get('status') || '';
    const propertyType = searchParams.get('propertyType') || ''; // rent or sell
    const type = searchParams.get('type') || ''; // Apartment, Villa, etc.
    const location = searchParams.get('location') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const agentId = searchParams.get('agentId') || '';
    const builderId = searchParams.get('builderId') || '';
    
    // Call the properties API with search parameters and filters
    const response = await propertiesApi.getAll({
      search,
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      propertyType,
      type,
      location,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      agentId,
      builderId
    });
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to fetch properties' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await propertiesApi.create(data);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to create property' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}