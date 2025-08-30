package online.course.market.utils;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class DataUtils {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]+");

    public static String toSlug(String input) {
        if (input == null) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String withoutAccents = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String slug = WHITESPACE.matcher(withoutAccents).replaceAll("-");
        slug = NONLATIN.matcher(slug).replaceAll("");

        return slug.toLowerCase(Locale.ENGLISH);
    }

    public static Boolean convertStatus(String status) {
        if ("active".equalsIgnoreCase(status)) {
            return true;
        } else if ("inactive".equalsIgnoreCase(status)) {
            return false;
        }
        throw new IllegalArgumentException("Invalid status: " + status);
    }
}
