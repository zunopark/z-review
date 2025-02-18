export function formatRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    // Less than 1 minute
    if (diffInSeconds < 60) {
        return "방금 전";
    }
    
    // Less than 1 hour
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
        return `${minutes}분 전`;
    }
    
    // Less than 1 day
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}시간 전`;
    }
    
    // Less than 7 days
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days}일 전`;
    }
    
    // More than 7 days - show full date
    return new Date(timestamp).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\. /g, '-').replace('.', '');
}