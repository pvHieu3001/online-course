package jp.ominext.arthralgia.utils;

import org.springframework.util.StringUtils;

import java.util.Optional;

public class Strings extends StringUtils {
    public static String nvl(String value) {
        return Optional.ofNullable(value).orElse("");
    }

    public static String empty() {
        return org.apache.commons.lang3.StringUtils.EMPTY;
    }
}
