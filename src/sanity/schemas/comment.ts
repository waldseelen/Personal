import { defineField, defineType } from 'sanity';

/**
 * Blog Comment Schema for Sanity
 * Stores moderated comments for blog posts
 */
export default defineType({
    name: 'comment',
    title: 'Comments',
    type: 'document',
    fields: [
        defineField({
            name: 'post',
            title: 'Post',
            type: 'reference',
            to: [{ type: 'post' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(100),
        }),
        defineField({
            name: 'email',
            title: 'Author Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'content',
            title: 'Comment',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().min(3).max(2000),
        }),
        defineField({
            name: 'status',
            title: 'Moderation Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Approved', value: 'approved' },
                    { title: 'Rejected', value: 'rejected' },
                    { title: 'Spam', value: 'spam' },
                ],
                layout: 'radio',
            },
            initialValue: 'pending',
        }),
        defineField({
            name: 'parentComment',
            title: 'Reply To',
            type: 'reference',
            to: [{ type: 'comment' }],
            description: 'Parent comment if this is a reply',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'moderatedAt',
            title: 'Moderated At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'moderatedBy',
            title: 'Moderated By',
            type: 'string',
            readOnly: true,
        }),
        // Spam detection metadata
        defineField({
            name: 'ipAddress',
            title: 'IP Address',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'userAgent',
            title: 'User Agent',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
    ],
    preview: {
        select: {
            title: 'content',
            subtitle: 'author',
            status: 'status',
            postTitle: 'post.title',
        },
        prepare(selection) {
            const { title, subtitle, status, postTitle } = selection;
            const statusEmoji = {
                pending: '⏳',
                approved: '✅',
                rejected: '❌',
                spam: '🚫',
            }[status as string] || '❓';

            return {
                title: title?.substring(0, 50) + (title?.length > 50 ? '...' : ''),
                subtitle: `${statusEmoji} ${subtitle} - ${postTitle || 'Unknown post'}`,
            };
        },
    },
    orderings: [
        {
            title: 'Pending First',
            name: 'pendingFirst',
            by: [
                { field: 'status', direction: 'asc' },
                { field: 'createdAt', direction: 'desc' },
            ],
        },
        {
            title: 'Newest',
            name: 'newest',
            by: [{ field: 'createdAt', direction: 'desc' }],
        },
    ],
});
