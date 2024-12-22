declare const formatDate: (date: string, locale?: string) => string;

function formatDate(dateString: string, locale = 'en-US'): string {
    let date;
    
    try {
        // Attempt to parse the input date string
        date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            // If parsing fails, fall back to epoch date
            date = new Date(0);
        }
    } catch (error) {
        // If any other error occurs during parsing, fall back to epoch date
        date = new Date(0);
    }

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Determine whether to show the year
    const showYear = date.getFullYear() !== currentYear && date.getFullYear() > currentYear;

    // Create the formatter options
    const options = {
        day: 'numeric',
        month: 'short'
    };

    if (showYear) {
        options.year = '2-digit';
    }

    // Format the date according to the determined options
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export { formatDate };
