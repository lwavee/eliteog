import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Service from '@/models/Service';
import Portfolio from '@/models/Portfolio';
import Blog from '@/models/Blog';
import Enquiry from '@/models/Enquiry';
import JobApplication from '@/models/JobApplication';
import Testimonial from '@/models/Testimonial';
import Faq from '@/models/Faq';
import Subscriber from '@/models/Subscriber';
import Setting from '@/models/Setting';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  await connectToDatabase();
  const slug = (await params).slug;

  try {
    if (slug[0] === 'services') {
      const data = await Service.find();
      return NextResponse.json({ success: true, data });
    }
    
    if (slug[0] === 'portfolios') {
      const data = await Portfolio.find();
      return NextResponse.json({ success: true, data });
    }

    if (slug[0] === 'blogs') {
      if (slug.length > 1) {
        // Single blog
        const data = await Blog.findOne({ slug: slug[1], published: true });
        if (!data) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, data });
      } else {
        // All blogs
        const data = await Blog.find({ published: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data });
      }
    }

    if (slug[0] === 'faqs') {
      const data = await Faq.find().sort({ order: 1 });
      return NextResponse.json({ success: true, data });
    }

    if (slug[0] === 'testimonials') {
      const data = await Testimonial.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data });
    }

    if (slug[0] === 'seo') {
      const data = await Setting.findOne({ key: 'seo_metadata' });
      return NextResponse.json({ success: true, data: data ? data.value : null });
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  await connectToDatabase();
  const slug = (await params).slug;
  const body = await req.json().catch(() => ({}));

  try {
    if (slug[0] === 'enquiries') {
      const enquiry = await Enquiry.create(body);
      return NextResponse.json({ success: true, data: enquiry, message: 'Enquiry submitted successfully' }, { status: 201 });
    }

    if (slug[0] === 'subscribe') {
      let subscriber = await Subscriber.findOne({ email: body.email });
      if (subscriber) {
        if (subscriber.status === 'active') {
          return NextResponse.json({ success: false, message: 'Email already subscribed' }, { status: 400 });
        }
        subscriber.status = 'active';
        await subscriber.save();
      } else {
        subscriber = await Subscriber.create({ email: body.email });
      }
      return NextResponse.json({ success: true, data: subscriber, message: 'Subscribed successfully' }, { status: 201 });
    }

    if (slug[0] === 'apply') {
      const application = await JobApplication.create(body);
      return NextResponse.json({ success: true, data: application, message: 'Application submitted successfully' }, { status: 201 });
    }

    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
