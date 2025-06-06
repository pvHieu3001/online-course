package online.course.market.constant;

import lombok.Getter;

import java.util.Arrays;

/**
 * Affected area
 */
public enum Area {
    //Right area
    R1("R1", "右顎"),
    R2("R2", "右胸鎖"),
    R3("R3", "右肩鎖"),
    R4("R4", "右肩"),
    R5("R5", "右肘"),
    R6("R6", "右手"),

    R7("R7", "右手親指MCP"),
    R8("R8", "右手人差指MCP"),
    R9("R9", "右手中指MCP"),
    R10("R10", "右手薬指MCP"),
    R11("R11", "右手小指MCP"),
    R12("R12", "右手親指IP拇指"),
    R13("R13", "右手人差指PIP"),
    R14("R14", "右手中指PIP"),
    R15("R15", "右手薬指PIP"),
    R16("R16", "右手小指PIP"),
    R17("R17", "右手人差指DIP"),
    R18("R18", "右手中指DIP"),
    R19("R19", "右手薬指DIP"),
    R20("R20", "右手小指DIP"),

    R21("R21", "右股"),
    R22("R22", "右膝"),
    R23("R23", "右足根"),

    R24("R24", "右足足の甲"),
    R25("R25", "右足親趾MTP"),
    R26("R26", "右足人差趾MTP"),
    R27("R27", "右足中趾MTP"),
    R28("R28", "右足薬趾MTP"),
    R29("R29", "右足小趾MTP"),
    R30("R30", "右足親趾IP拇趾"),
    R31("R31", "右足人差趾PIP"),
    R32("R32", "右足中趾PIP"),
    R33("R33", "右足薬趾PIP"),
    R34("R34", "右足小趾PIP"),
    R35("R35", "右足CMC"),

    //Left area
    L1("L1", "右顎"),
    L2("L2", "右胸鎖"),
    L3("L3", "右肩鎖"),
    L4("L4", "右肩"),
    L5("L5", "右肘"),
    L6("L6", "右手"),
    L7("L7", "右手親指MCP"),
    L8("L8", "右手人差指MCP"),
    L9("L9", "右手中指MCP"),
    L10("L10", "右手薬指MCP"),
    L11("L11", "右手小指MCP"),
    L12("L12", "右手親指IP拇指"),
    L13("L13", "右手人差指PIP"),
    L14("L14", "右手中指PIP"),
    L15("L15", "右手薬指PIP"),
    L16("L16", "右手小指PIP"),
    L17("L17", "右手人差指DIP"),
    L18("L18", "右手中指DIP"),
    L19("L19", "右手薬指DIP"),
    L20("L20", "右手小指DIP"),
    L21("L21", "右股"),
    L22("L22", "右膝"),
    L23("L23", "右足根"),
    L24("L24", "右足足の甲"),
    L25("L25", "右足親趾MTP"),
    L26("L26", "右足人差趾MTP"),
    L27("L27", "右足中趾MTP"),
    L28("L28", "右足薬趾MTP"),
    L29("L29", "右足小趾MTP"),
    L30("L30", "右足親趾IP拇趾"),
    L31("L31", "右足人差趾PIP"),
    L32("L32", "右足中趾PIP"),
    L33("L33", "右足薬趾PIP"),
    L34("L34", "右足小趾PIP"),
    L35("L35", "右足CMC");

    @Getter
    private final String value;

    @Getter
    private final String name;

    Area(String value, String name) {
        this.value = value;
        this.name = name;
    }

    public static Area of(final String type) {
        return Arrays.stream(Area.values())
                .filter(t -> t.value.equals(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Specified Area is unsupported. Area=" + type));
    }
}
