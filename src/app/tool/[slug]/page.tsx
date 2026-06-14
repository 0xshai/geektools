import { getToolBySlug, getAllTools, getCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import ToolDetailPage from '@/components/ToolDetailPage';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到' };
  return {
    title: `${tool.name} - 极客工具站`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const categories = getCategories();
  return <ToolDetailPage tool={tool} categories={categories} />;
}
