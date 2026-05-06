'use client';

import Link from 'next/link';

export type PageBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; alt?: string }
  | { type: 'quote'; text: string; caption?: string }
  | { type: 'button'; text: string; url: string }
  | { type: 'grid'; items: Array<{ title: string; description: string; url?: string }> };

import Image from 'next/image';

export default function PageRenderer({ content }: { content: PageBlock[] }) {
  return (
    <div className="space-y-12">
      {content.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2 key={index} className="text-4xl font-black uppercase tracking-tight">
              {block.text}
            </h2>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="text-lg leading-relaxed text-gray-600 max-w-4xl">
              {block.text}
            </p>
          );
        }

        if (block.type === 'image') {
          return (
            <div key={index} className="rounded-[32px] overflow-hidden border border-bento-line bg-gray-100 relative w-full h-64">
              <Image
                src={block.url}
                alt={block.alt || 'CMS image'}
                fill
                className="object-cover"
              />
            </div>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={index} className="border-l-4 border-black pl-6 italic text-gray-700">
              {block.text}
              {block.caption && <span className="block mt-4 text-sm uppercase tracking-[0.3em] text-black/40">{block.caption}</span>}
            </blockquote>
          );
        }

        if (block.type === 'button') {
          return (
            <Link key={index} href={block.url} className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 uppercase tracking-widest text-sm font-bold transition-all hover:bg-black hover:text-white">
              {block.text}
            </Link>
          );
        }

        if (block.type === 'grid') {
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {block.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white rounded-[32px] border border-bento-line p-8">
                  <h3 className="text-xl font-black uppercase mb-3">{item.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed mb-4">{item.description}</p>
                  {item.url && (
                    <Link href={item.url} className="text-xs uppercase tracking-[0.3em] font-bold text-black/70 hover:text-black">
                      Explore
                    </Link>
                  )}
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
