package online.course.market.utils;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Date Utils
 */
public final class Dates {
    public static final String ISO_ZONED_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssZZ";
    public static final String ISO_ZONED_DATE_FORMAT = "yyyy-MM-dd";
    public static final String ISO_DATE_FORMAT = "yyyyMMdd";

    private Dates() {}

    public static Date now() {
        return new Date();
    }

    /**
     * Strictly parse the date and convert it to a {@link Date} object.
     *
     * @param source String to be converted
     * @param format Date format
     * @return Returns {@link Date} only when normal. Otherwise throws {@link IllegalArgumentException}
     */
    public static Date parseExact(final String source, final String format) {
        return parseExact(source, format, null);
    }

    /**
     * Strictly parse the date and convert it to a {@link Date} object.
     *
     * @param source String to be converted
     * @param format Date format
     * @param timeZone Time zone after conversion
     * @return Returns {@link Date} only when normal. Otherwise throws {@link IllegalArgumentException}
     */
    public static Date parseExact(final String source, final String format, final TimeZone timeZone) {
        if (source == null) {
            return null;
        }
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        if (timeZone != null) {
            formatter.setTimeZone(timeZone);
        }
        formatter.setLenient(false);
        try {
            return formatter.parse(source);
        } catch (ParseException ex) {
            throw new IllegalArgumentException(ex);
        }
    }

    /**
     * Convert date string in the format defined by {@code ISO_ZONED_DATETIME_FORMAT} to {@link Date}.
     * @param source String to be converted
     * @return Returns {@link Date} only when normal. Otherwise, return {@code null}.
     */
    public static Date parseISO(final String source) {
        SimpleDateFormat formatter = new SimpleDateFormat( Dates.ISO_ZONED_DATETIME_FORMAT);
        formatter.setLenient(false);
        try {
            return formatter.parse(source);
        } catch (ParseException ex) {
            return null;
        }
    }

    /**
     * Convert {@link Date} to a character string in the specified format.
     *
     * @param source {@link Date} to be converted
     * @param format Date format
     * @return Character string specified in date format.
     * If either {@code source} or {@code format} is {@code null}, return {@code null}.
     */
    public static String format(final Date source, final String format) {
        return format(source, format, null);
    }

    /**
     * Convert {@link Date} to a character string in the specified format.
     *
     * @param source {@link Date} to be converted
     * @param format Date format
     * @param timeZone Time zone after conversion
     * @return Character string specified in date format.
     * If either {@code source} or {@code format} is {@code null}, return {@code null}.
     */
    public static String format(final Date source, final String format, final TimeZone timeZone) {
        if (source == null) {
            return null;
        }
        if (format == null || format.length() == 0) {
            return null;
        }

        SimpleDateFormat sdf = new SimpleDateFormat(format);
        if (timeZone != null) {
            sdf.setTimeZone(timeZone);
        }
        return sdf.format(source);
    }

    /**
     * Convert {@link Date} to UTC time zone string in {@code yyyy-MM-dd'T'HH: mm: ssZZ} format.
     *
     * @param source {@link Date} to be converted
     * @return Character string specified in date format.
     * If either {@code source} or {@code format} is {@code null}, return {@code null}.
     */
    public static String formatUTC(final Date source) {
        return formatUTC(source, Dates.ISO_ZONED_DATETIME_FORMAT);
    }

    /**
     * Convert {@link Date} to UTC time zone string in specified format.
     *
     * @param source {@link Date} to be converted
     * @param format Date format
     * @return Character string specified in date format.
     * If either {@code source} or {@code format} is {@code null}, return {@code null}.
     */
    public static String formatUTC(final Date source, final String format) {
        return format(source, format, TimeZone.getTimeZone("UTC"));
    }

    public static String getStartOfDayDateString(String dateStr) {
        String timeStr = StringUtils.substringBetween(dateStr, "T", "+");
        if (timeStr != null) {
            return dateStr.replace(timeStr, "00:00:00");
        } else {
            return null;
        }
    }

    public static String getEndOfDayDateString(String dateStr) {
        String timeStr = StringUtils.substringBetween(dateStr, "T", "+");
        if (timeStr != null) {
            return dateStr.replace(timeStr, "23:59:59");
        } else {
            return null;
        }
    }
}
