import { XIcon } from 'lucide-react';
import { useRef } from 'react';

import Image from '@/components/image';
import { cn } from '@/lib/utils';

type ArticleImageProps = {
  alt: string;
  caption?: string;
  className?: string;
  src: string | { src: string };
};

export function ArticleImage({ alt, caption, className, src }: ArticleImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <figure className={cn('not-prose mx-auto my-8 w-full max-w-4xl', className)}>
        <button
          type="button"
          className="block w-full bg-transparent p-0"
          aria-label={`Open ${caption ?? alt} full screen`}
          onClick={() => dialogRef.current?.showModal()}
        >
          <Image
            src={src}
            alt={alt}
            className="mx-auto max-h-[52rem] w-auto max-w-full cursor-zoom-in rounded-[4px] object-contain"
            loading="lazy"
          />
        </button>
        {caption ? (
          <figcaption className="mx-auto mt-3 max-w-2xl text-center font-sans text-sm leading-6 text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85"
        aria-label={caption ?? alt}
        onClick={(event) => {
          if (event.currentTarget === event.target) event.currentTarget.close();
        }}
      >
        <div
          className="flex min-h-full items-center justify-center p-6"
          onClick={(event) => {
            if (event.currentTarget === event.target) dialogRef.current?.close();
          }}
        >
          <Image
            src={src}
            alt={alt}
            className="max-h-[calc(100dvh-3rem)] max-w-[calc(100vw-3rem)] object-contain"
          />
          <button
            type="button"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-[4px] border border-white/20 bg-black/60 text-white hover:bg-black/80"
            aria-label="Close image"
            onClick={() => dialogRef.current?.close()}
          >
            <XIcon className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
