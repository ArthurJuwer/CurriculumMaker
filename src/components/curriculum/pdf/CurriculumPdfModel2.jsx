import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, accent, sizes, SPACING } from "./styles";

const DEFAULT_TITLES = [
  "Objetivo",
  "Experiências",
  "Formação",
  "Idiomas",
  "Certificações",
  "Carga horária",
  "Conclusão",
];

export default function CurriculumPdfModel2({ values }) {
  const v = values || {};
  const titles = v.titles || DEFAULT_TITLES;
  const elementsMoved = v.elementsMoved || 0;
  const accentColor = accent(v.color);
  const s = sizes(v);

  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: SPACING.pagePadding,
      paddingVertical: SPACING.pagePadding,
      fontFamily: "Helvetica",
      color: COLORS.TitleGray,
    },
    name: {
      fontFamily: "Helvetica-Bold",
      color: accentColor,
      textTransform: "uppercase",
      fontSize: s.title,
      textAlign: "center",
      marginBottom: 4,
    },
    headerRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      color: COLORS.TitleGray,
      fontSize: s.body,
      marginBottom: SPACING.headerToBody,
    },
    headerItem: {
      marginRight: 6,
      fontSize: s.body,
      color: COLORS.TitleGray,
    },
    sectionWrap: {
      marginBottom: SPACING.sectionGap,
    },
    sectionTitle: {
      fontFamily: "Helvetica-Bold",
      color: COLORS.StrongGray,
      textTransform: "uppercase",
      fontSize: s.subtitle,
      marginBottom: 6,
      paddingBottom: 3,
      borderBottomWidth: 1.5,
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
    },
    body: {
      color: COLORS.TitleGray,
      fontSize: s.body,
      lineHeight: 1.4,
    },
    bullet: {
      flexDirection: "row",
      marginBottom: 2,
    },
    bulletDot: {
      width: s.body * 0.9,
      fontSize: s.body,
      color: COLORS.TitleGray,
    },
    bulletText: {
      flex: 1,
      fontSize: s.body,
      color: COLORS.TitleGray,
      lineHeight: 1.4,
    },
    projectGroup: {
      marginBottom: SPACING.intraGroup,
    },
    projectHead: {
      flexDirection: "row",
      gap: 4,
      marginBottom: 1,
    },
    projectYear: {
      color: COLORS.TitleGray,
      fontSize: s.body,
    },
    projectTitle: {
      color: COLORS.TitleGray,
      fontSize: s.body,
    },
    projectDescription: {
      color: COLORS.WeakGray,
      fontSize: s.body,
      lineHeight: 1.4,
    },
    languagesRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    certEntry: {
      flexDirection: "row",
      marginBottom: SPACING.intraGroup,
    },
    certName: {
      fontSize: s.body,
      color: COLORS.TitleGray,
      lineHeight: 1.35,
    },
    certMeta: {
      fontSize: s.body,
      color: COLORS.WeakGray,
      lineHeight: 1.35,
      marginTop: 2,
    },
  });

  const Header = () => {
    const items = [
      v.bairro && `${v.bairro} |`,
      v.cidade && `${v.cidade},`,
      v.estado && `${v.estado} |`,
      v.telefone && `${v.telefone} |`,
      v.email,
      v.linkedin,
    ].filter(Boolean);

    return (
      <View>
        <Text style={styles.name}>{v.name}</Text>
        <View style={styles.headerRow}>
          {items.map((item, i) => (
            <Text key={i} style={styles.headerItem}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const ObjectiveSection = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{titles[0]}</Text>
      <Text style={styles.body}>{v.objective}</Text>
    </View>
  );

  const ProjectsSection = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{titles[1]}</Text>
      {v.projects?.map((item, idx) => (
        <View key={`p-${idx}`} style={styles.projectGroup}>
          <View style={styles.projectHead}>
            <Text style={styles.projectYear}>{item?.year} -</Text>
            <Text style={styles.projectTitle}>
              {item?.title} | {item?.category}
            </Text>
          </View>
          <Text style={styles.projectDescription}>{item?.description}</Text>
        </View>
      ))}
    </View>
  );

  const FormationsSection = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{titles[2]}</Text>
      {v.formations?.map((item, idx) => (
        <View key={`f-${idx}`} style={{ marginBottom: 3 }}>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>{item?.school}</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              {item?.title} | {item?.yearEntry} - {item?.yearLeave}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const LanguagesSection = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{titles[3]}</Text>
      <View style={styles.languagesRow}>
        {v.languages?.map((item, idx) => (
          <Text key={`l-${idx}`} style={styles.bulletText}>
            • {item?.language} ({item?.level})
          </Text>
        ))}
      </View>
    </View>
  );

  const CertificationsSection = () => (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>{titles[4]}</Text>
      {v.certifications?.map((item, idx) => (
        <View key={`c-${idx}`} style={styles.certEntry}>
          <Text style={styles.bulletDot}>•</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.certName}>{item?.name}</Text>
            <Text style={styles.certMeta}>
              {titles[5]} {item?.workload}h. ({titles[6]} {item?.conclusion})
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const sectionsPage1 = [
    v.objective && elementsMoved < 5 && <ObjectiveSection key="obj" />,
    v.projects?.length > 0 && elementsMoved < 4 && <ProjectsSection key="prj" />,
    v.formations?.length > 0 && elementsMoved < 3 && <FormationsSection key="fmt" />,
    v.languages?.length > 0 && elementsMoved < 2 && <LanguagesSection key="lng" />,
    v.certifications?.length > 0 && elementsMoved < 1 && <CertificationsSection key="crt" />,
  ].filter(Boolean);

  const sectionsPage2 = [
    v.objective && elementsMoved >= 5 && <ObjectiveSection key="obj-2" />,
    v.projects?.length > 0 && elementsMoved >= 4 && <ProjectsSection key="prj-2" />,
    v.formations?.length > 0 && elementsMoved >= 3 && <FormationsSection key="fmt-2" />,
    v.languages?.length > 0 && elementsMoved >= 2 && <LanguagesSection key="lng-2" />,
    v.certifications?.length > 0 && elementsMoved >= 1 && <CertificationsSection key="crt-2" />,
  ].filter(Boolean);

  return (
    <Document
      title={v.nameCurriculum || v.name || "Currículo"}
      author={v.name}
      creator="CurriculumMaker"
    >
      <Page size="A4" style={styles.page}>
        <Header />
        {sectionsPage1}
      </Page>
      {sectionsPage2.length > 0 && (
        <Page size="A4" style={styles.page}>
          {sectionsPage2}
        </Page>
      )}
    </Document>
  );
}
