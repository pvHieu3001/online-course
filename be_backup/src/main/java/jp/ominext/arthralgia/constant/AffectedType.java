package jp.ominext.arthralgia.constant;

import lombok.Getter;

import java.util.Arrays;

/**
 * Affected Type
 */
public enum AffectedType {
    SWELLING1("S1"),
    SWELLING2("S2"),
    SWELLING3("S3"),
    PAIN("P"),
    PAIN_SWELLING1("PS1"),
    PAIN_SWELLING2("PS2"),
    PAIN_SWELLING3("PS3"),
    NORMAL("N");

    @Getter
    private final String value;

    AffectedType(String value) {
        this.value = value;
    }

    public static AffectedType of(final String type) {
        return Arrays.stream(AffectedType.values())
                .filter(t -> t.value.equals(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Specified AffectedType is unsupported. AffectedType=" + type));
    }
}
