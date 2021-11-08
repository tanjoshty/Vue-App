export const formatDate = (post: any): string => {
    const date = new Date(post.createdDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
