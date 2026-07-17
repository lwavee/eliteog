import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import Service from '@/models/Service';
import Portfolio from '@/models/Portfolio';
import Blog from '@/models/Blog';
import Enquiry from '@/models/Enquiry';
import JobApplication from '@/models/JobApplication';
import Testimonial from '@/models/Testimonial';
import Faq from '@/models/Faq';
import Subscriber from '@/models/Subscriber';

// Generic handler for GET requests
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  if (!verifyAuth(req)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
  await connectToDatabase();
  const slug = (await params).slug;

  try {
    if (slug[0] === 'stats') {
      const servicesCount = await Service.countDocuments();
      const projectsCount = await Portfolio.countDocuments();
      const blogsCount = await Blog.countDocuments();
      const pendingEnquiriesCount = await Enquiry.countDocuments({ status: 'unread' });
      const subscribersCount = await Subscriber.countDocuments({ status: 'active' });

      return NextResponse.json({
        success: true,
        data: {
          counts: {
            services: servicesCount,
            projects: projectsCount,
            blogs: blogsCount,
            pendingEnquiries: pendingEnquiriesCount,
            subscribers: subscribersCount,
          }
        }
      });
    }

    if (slug[0] === 'enquiries') {
      const data = await Enquiry.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data });
    }

    if (slug[0] === 'applications') {
      const data = await JobApplication.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data });
    }

    if (slug[0] === 'subscribers') {
      const data = await Subscriber.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Generic handler for POST requests
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  if (!verifyAuth(req)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
  await connectToDatabase();
  const slug = (await params).slug;
  const body = await req.json().catch(() => ({}));

  try {
    if (slug[0] === 'services') {
      const data = await Service.create(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
    if (slug[0] === 'portfolio') {
      const data = await Portfolio.create(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
    if (slug[0] === 'blogs') {
      const data = await Blog.create(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Generic handler for PUT requests
export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  if (!verifyAuth(req)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
  await connectToDatabase();
  const slug = (await params).slug;
  const body = await req.json().catch(() => ({}));

  if (slug.length < 2) return NextResponse.json({ success: false, message: 'Missing ID parameter' }, { status: 400 });
  const resource = slug[0];
  const id = slug[1];

  try {
    let data;
    switch (resource) {
      case 'services': data = await Service.findByIdAndUpdate(id, body, { new: true }); break;
      case 'portfolio': data = await Portfolio.findByIdAndUpdate(id, body, { new: true }); break;
      case 'blogs': data = await Blog.findByIdAndUpdate(id, body, { new: true }); break;
      case 'enquiries': data = await Enquiry.findByIdAndUpdate(id, { status: body.status }, { new: true }); break;
      case 'applications': data = await JobApplication.findByIdAndUpdate(id, { status: body.status }, { new: true }); break;
      default: return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// Generic handler for DELETE requests
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  if (!verifyAuth(req)) return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
  await connectToDatabase();
  const slug = (await params).slug;
  
  if (slug.length < 2) return NextResponse.json({ success: false, message: 'Missing ID parameter' }, { status: 400 });
  const resource = slug[0];
  const id = slug[1];

  try {
    switch (resource) {
      case 'services': await Service.findByIdAndDelete(id); break;
      case 'portfolio': await Portfolio.findByIdAndDelete(id); break;
      case 'blogs': await Blog.findByIdAndDelete(id); break;
      case 'enquiries': await Enquiry.findByIdAndDelete(id); break;
      case 'applications': await JobApplication.findByIdAndDelete(id); break;
      case 'subscribers': await Subscriber.findByIdAndDelete(id); break;
      default: return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
