import { NextRequest, NextResponse } from 'next/server';
import { agentsApi } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    // Extract search query from URL parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    
    // Call the agents API with search parameters
    const response = await agentsApi.getAll({
      search,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: error.message || 'Failed to fetch agents' 
        } 
      },
      { status: error.response?.status || 500 }
    );
  }
}