package jp.ominext.arthralgia.constant;

import lombok.Getter;

import java.util.Arrays;

public enum AreaType {
    RIGHT_HAND("RH"),
    LEFT_HAND("LH"),
    RIGHT_FOOT("RF"),
    LEFT_FOOT("LF"),
    BODY("B");

    @Getter private final String value;

    AreaType(String value) {
        this.value = value;
    }

    public static AreaType of(final String type) {
        return Arrays.stream(AreaType.values())
                .filter(t -> t.value.equals(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Specified AreaType is unsupported. AreaType=" + type));
    }
}
