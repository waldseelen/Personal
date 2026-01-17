import { author } from './author';
import { blockContent } from './blockContent';
import { category } from './category';
import comment from './comment';
import contactMessage from './contactMessage';
import { localizedBlockContent, localizedString, localizedText } from './localization';
import { page } from './page';
import { post } from './post';
import { project } from './project';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
    // Document types
    post,
    author,
    category,
    project,
    page,
    siteSettings,
    contactMessage,
    comment,
    // Object types
    blockContent,
    // Localization types
    localizedString,
    localizedText,
    localizedBlockContent,
];
