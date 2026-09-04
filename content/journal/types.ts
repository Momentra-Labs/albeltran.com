import type {
  ArticleDifficulty,
  ArticlePriority,
  ArticleSection,
  ArticleStatus,
  JournalTopicId,
  SearchIntent,
} from "@/content/journal/topics";

export type JournalEntry = {
  id: string;
  title: string;
  slug: string;
  category: JournalTopicId;
  subcategory: string;
  description: string;
  targetIntent: SearchIntent;
  difficulty: ArticleDifficulty;
  technologies: string[];
  tags: string[];
  relatedArticles: string[];
  status: ArticleStatus;
  priority: ArticlePriority;
  section: ArticleSection;
};
