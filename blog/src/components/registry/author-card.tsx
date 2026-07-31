import { ProfileAvatar } from '@/components/registry/profile-avatar';

export function AuthorCard({
  name,
  role,
  avatarUrl,
  website,
}: {
  name: string;
  role: string;
  avatarUrl: string;
  website?: string;
}) {
  const content = (
    <>
      <ProfileAvatar src={avatarUrl} name={name} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{name}</span>
        <span className="block truncate text-sm text-muted-foreground">{role}</span>
      </span>
    </>
  );

  return website ? (
    <a href={website} className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  );
}
