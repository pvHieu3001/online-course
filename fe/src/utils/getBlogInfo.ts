export const getBlogInfoByType = (type: string): { path: string; title: string } => {
  const blogInfoByType: Record<string, { path: string; title: string }> = {
    technology: { path: 'technology', title: 'Technology' },
    lifestyle: { path: 'lifestyle', title: 'Lifestyle' },
    travel: { path: 'travel', title: 'Travel' },
    world: { path: 'world', title: 'World' },
    education: { path: 'education', title: 'Education' },
    science: { path: 'science', title: 'Science' },
    history: { path: 'history', title: 'History' },
    celeb: { path: 'celeb', title: 'Celeb' }
  }

  return blogInfoByType[type] ?? blogInfoByType.technology
}
