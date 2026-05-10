import { StyleSheet } from "@react-pdf/renderer";

export const COLORS = {
  StrongGray: "#1E1E1E",
  TitleGray: "#3B3C3F",
  WeakGray: "#7F8086",
  DefaultOrange: "#DE651A",
};

export const parseSize = (val) => {
  if (typeof val === "number") return val;
  if (typeof val !== "string") return undefined;
  const num = parseFloat(val);
  if (Number.isNaN(num)) return undefined;
  return num;
};

export const accent = (color) => `#${color || "DE651A"}`;

export const sizes = (effectiveValues) => ({
  title: parseSize(effectiveValues?.textTitle) ?? 28,
  subtitle: parseSize(effectiveValues?.textSubTitle) ?? 20,
  body: parseSize(effectiveValues?.textCorp) ?? 12,
});

export const SPACING = {
  pagePadding: 40,
  sectionGap: 14,
  headerToBody: 18,
  intraGroup: 6,
};

export const baseStyles = StyleSheet.create({
  page: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    fontFamily: "Helvetica",
    color: COLORS.TitleGray,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    color: COLORS.StrongGray,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  body: {
    color: COLORS.TitleGray,
    lineHeight: 1.35,
  },
  headerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  bullet: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 1,
  },
});
