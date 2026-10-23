/* ═══════════════════════════════════════════════════════════
   MCV4U COURSE DATA — this is the only file you edit.
   Semester 2, 2026–27: 88 class days, Mon Feb 1 to Wed Jun 16 2027,
   dated from MCV4U Course Plan 2027 S2.

   Each day looks like:
     {d:2, iso:"2027-02-02", topic:"Rationalizing", num:"1.2",
      note:"", ans:"", extras:[]}

   - note: paste the URL of the blank note & practice problems.
           Empty "" shows a greyed-out link with "Coming soon".
   - ans:  paste the URL of the answers. Empty "" is greyed out
           with "Coming soon"; once filled it goes live with the
           ☠︎ "do not look" hover. ansLabel renames the link
           ("Solutions" on the practice exam and review stations).
   - num:  the note number shown to students ("1.2 Blank Note &
           Practice Problems"). Days with no note (tests, work
           periods) just leave num out. noteLabel overrides the
           whole label when a day has no clean number (reviews,
           practice quizzes, speed quizzes).
   - flag: "pquiz" | "quiz" | "test" | "exam" tints the row and puts
           a flag at the top of the day; "review" only tints it.
   - covers: the topics written inside that flag, after the colon
           ("PRACTICE QUIZ: 1.2–1.5"). Leave "" and the flag is just
           the word.
   - topic: the lesson taught that day. On a flagged day it sits
           below the flag; leave "" if nothing else happens.
   - extras: [ ["Title","https://…","kind"], … ]
           kind = "doc" (worksheet/handout), "ans" (solutions,
           shows the ☠︎ warning), "vid" (video), "skills"
           (Prerequisite Skills sheet).

   D(id) is shorthand for a Google Drive link — paste either a
   full URL or D("fileId"), both work.

   KEYS: every KEY's id is stashed in a comment right after ans:""
   — after class, move it into the ans field. Speed Quiz II's key
   is a commented-out extras entry: uncomment it after class.

   UNITS 1–4 link the LaTeX notes rebuilt in Oct 2026. UNITS 5–7
   link the 2026 vectors notes (to be rebuilt); their 2026 textbook
   homework is kept in a comment on each day, not shown on the site.

   SHARING: the notes live in the gmail Drive (Classes/02B MCV4U).
   They open for students only once each unit folder (01 Calc Intro
   to 07 Lines & Planes) is set to "anyone with the link, viewer".
   Never share Assessments/ (tests, exams, SOLUTIONS). The outline
   is in Course Planning/Public, already shared.

   To Save Time:

   git add . && git commit -m "1.2 key add" && git push origin main
   ═══════════════════════════════════════════════════════════ */

const D = id => `https://drive.google.com/file/d/${id}/view`;

const COURSE = {
  code: "MCV4U",
  title: "Calculus & Vectors",
  sub: "Grade 12 · University Preparation",

  /* Pinned under the title, above the units: [label, url, kind, warn].
     kind = "outline" | "routine" | "calc". A warn string shows as a hazard
     note on hover (desktop) or first tap (phone). */
  essentials: [
    ["Course Outline",D("1_I277HeaNLCcZnPxaKvVWXA7BaKM-TSm"),"outline"],   /* Course Planning/Public, LaTeX outline of 12 Oct 2026 */
    ["Approved Calculators",D("1Hq2HE1EzSy2frKT0pfDUSWshgf0GB7A1"),"calc","Must be one of these exact models"],
  ],

  units: [
  /* ── INTRODUCTION TO CALCULUS ────────────────────────────── */
  {name:"Introduction to Calculus", days:[
    {d:1, iso:"2027-02-01", topic:"Introduction to Calculus", num:"1.1",
      note:D("1ajuuuMcajyecMPlMl-T8G81n63AKI4EM"),
      ans:"", /* key: D("1QAwtlBdgtuCOChwEkmdF5jMgjAsuYoot") */
      extras:[["Basic Skills Review", D("1aMuLCLJ0HEaUJA44qXr8Vd-gys5t6g85"), "skills"],
              ["Ms. Havrot’s Videos", "https://www.youtube.com/c/MsHavrotsCanadianUniversityMathPrerequisites/playlists", "vid"],
              ["TVO Learn: MCV4U", "https://tvolearn.com/collections/courses/products/mcv4u-calculus-and-vectors", "doc"]]},
    {d:2, iso:"2027-02-02", topic:"Rationalizing", num:"1.2",
      note:D("18cI94Y4fW1MtPsLBYsbZclSg0Xnz8weC"),
      ans:"", /* key: D("1mHskIc9XUN3CAQAUo8ze7gJBP4PYIeXw") */
      extras:[["What Are These Symbols?", "https://www.youtube.com/watch?v=fUCEg3HznX4", "vid"],
              ["Khan Academy: Rationalizing", "https://www.youtube.com/watch?v=ENIUcjdPO54", "vid"]]},
    {d:3, iso:"2027-02-03", topic:"Slope of a Tangent", num:"1.3",
      note:D("1esaQ0YCo5tAfpXJS84_Hjc3xNkJAmLzL"),
      ans:"", /* key: D("1u9r1FmpYnwflJ5JrBV62WZB0TzFrNEcZ") */
      extras:[["Prerequisite Skills", D("1geuqBK6jy6EgInleW0rE0h0Fy_qo0-J3"), "skills"],
              ["Tangent Line Sim (Desmos)", "https://www.desmos.com/calculator/8gstpreekm", "doc"]]},
    {d:4, iso:"2027-02-04", topic:"Rates of Change", num:"1.4",
      note:D("1EUaufRWU6N2zjKkr4Kmyw7MZllXiNNBl"),
      ans:"", /* key: D("1-f154vuGApWhDdcRhFWJRWrDnvzc-dIP") */
      extras:[["Average & Instantaneous Rate of Change", "https://www.youtube.com/watch?v=4Up5gsDeluw", "vid"]]},
    {d:5, iso:"2027-02-05", topic:"Limits", num:"1.5",
      note:D("1VrzTiaMPZezKhMH4ukZqJIVkmM1xq-x5"),
      ans:"", /* key: D("1HIsK9CPtEZeYqzWMYNfQnnMcxoTK_4Uj") */
      extras:[["Limits Extra Practice (answers included)", D("1J1vq-MaqeM-L8BT0CuXGDlrLIWeDKDhx"), "doc"],
              ["Problems with Zero", "https://www.youtube.com/watch?v=BRRolKTlF6Q", "vid"],
              ["The Opposite of Infinity", "https://www.youtube.com/watch?v=WYijIV5JrKg", "vid"]]},
    {d:6, iso:"2027-02-08", flag:"pquiz", covers:"1.2–1.5", topic:"", noteLabel:"U1 Practice Quiz",
      note:D("1n993GpuMD48uvNfUNj_CGCnfcsLsq1KN"),
      ans:"", /* key: D("1ZcfuI4oHsCEqzAvptU4gPZThQ3UvklqB") */
      extras:[["Evaluating Limits Practice (answers included)", D("1h99YM0ZSSyqD-MzU2JFZadyuq3iZ6GpJ"), "doc"]]},
    {d:7, iso:"2027-02-09", topic:"Properties of Limits", num:"1.6",
      note:D("118IvMinkFc3W5cEs5PR-gdVp9XssixLc"),
      ans:"", /* key: D("1OhfMOnPKc36FXh6mTNT101QMV53LxUDn") */
      extras:[]},
    {d:8, iso:"2027-02-10", topic:"Continuity", num:"1.7",
      note:D("13QYRU5Y7Q1RGCsSpxYUhqE_BxWQzrnw5"),
      ans:"", /* key: D("13Fy0988Xc3RxgZoopuKIaY521DHfiNqH") */
      extras:[]},
    {d:9, iso:"2027-02-11", flag:"review", topic:"Unit 1 Review", noteLabel:"Unit 1 Review",
      note:D("1pDEWhXw7NJbxkWg1IdYQ98v8lg_PUYW5"),
      ans:"", /* key: D("1SqD_4x3nf7r-ZVjydjzL6fa2fZFmhuBm") */
      extras:[]},
    {d:10, iso:"2027-02-12", flag:"test", covers:"Unit 1", topic:"",
      extras:[]},
  ]},

  /* ── DERIVATIVES ─────────────────────────────────────────── */
  {name:"Derivatives", days:[
    {d:11, iso:"2027-02-16", topic:"The Derivative", num:"2.1",
      note:D("1KQkeLO7J3lZnvbvtjH_3jz9SgDP7J6B_"),
      ans:"", /* key: D("1T8bIQ9-1Nc5v_eFl8g0zWPsTq1BOGVnw") */
      extras:[["How You Could Have Come Up with Calculus", "https://www.youtube.com/watch?v=WUvTyaaNkzM", "vid"],
              ["Derivatives: A Physics Perspective", "https://www.youtube.com/watch?v=ObHJJYvu3RE", "vid"]]},
    {d:12, iso:"2027-02-17", topic:"Power Rule", num:"2.2",
      note:D("140qn8wTSipqyBIc56BDajTlhSQuqTwPx"),
      ans:"", /* key: D("1M-DnGGjZV_v6l9lPZT07Gqk2NaBQA8Yo") */
      extras:[["Khan Academy: Power Rule", "https://www.youtube.com/watch?v=bRZmfc1YFsQ", "vid"],
              ["Power Rule: Intuitive Proof", "https://www.youtube.com/watch?v=_yDsJ-P_X9g", "vid"],
              ["Power Rule: Proof by the Binomial Theorem", "https://www.youtube.com/watch?v=OSDutJBx_TM", "vid"]]},
    {d:13, iso:"2027-02-18", topic:"Product Rule", num:"2.3",
      note:D("1gEPrpzEWcysMr7ev_c9LNZiUBv8JHqpl"),
      ans:"", /* key: D("1o3Wj0JvZLf1my5pUk_ucjhqAyM4q6b_J") */
      extras:[]},
    {d:14, iso:"2027-02-19", flag:"quiz", topic:"Speed Quiz I", noteLabel:"Speed Quiz I",
      note:D("1Cor7Tb3IdjhE8tf6ODOSivxkRLX92Qas"),
      ans:"", /* key: D("1ThVUJwTpgcefQLB2KaTImW-lvxLt-U3c") */
      extras:[]},
    {d:15, iso:"2027-02-22", topic:"Quotient Rule", num:"2.4",
      note:D("1d3uWckq-YlbCcqHugo_Jco4IutAgTwc1"),
      ans:"", /* key: D("169sxJnmF9QtbLwcQIdOPr_lt1cKz7SYz") */
      extras:[["Quotient Rule Practice", D("19NqPMhaMJ0-Ld9nwvGA-enzjZSwMYA-s"), "doc"],
              ["Answers", D("1UteoBo4A8I7EQ6x7N9mlDG0aiXLe79Xt"), "ans"]]},
    {d:16, iso:"2027-02-23", topic:"Chain Rule", num:"2.5",
      note:D("1wvwEunx0dKL4GDcoZ6eJxWYqR6g_kf-1"),
      ans:"", /* key: D("10-gK8Y6nU6_I-PC12xkcR-fTG-fxQl1X") */
      extras:[["Chain Rule Practice", D("1AeAPhsiUEovZ6pDYX5_YM4mNGUG_GIfU"), "doc"],
              ["Answers", D("18sd2OHLJ2DkltQxlilON7iEZkGrh5_Lu"), "ans"]]},
    {d:17, iso:"2027-02-24", flag:"review", topic:"Chapter 2 Review + Speed Quiz II", noteLabel:"Chapter 2 Review",
      note:D("1RJjDaiqMpERSXLt2TDUhKN0slpi8Skm6"),
      ans:"", /* key: D("1bb-oZhhbdNsLIsRyzbghfAt4gNOCOMqD") */
      extras:[["Speed Quiz II", D("1MPCpr9YmHGRpMpBdYl7bEF1tAg70x6FE"), "doc"],
              /* key: ["Answers", D("1DFUF5XPD8ZIgYKGaMCPhis3IoxB-fawv"), "ans"] */]},
    {d:18, iso:"2027-02-25", topic:"Exponentials (eˣ) and ln", num:"2.6",
      note:D("1ypvABZ8WQpIPymXWlV1QngpuvPwhLphF"),
      ans:"", /* key: D("1yFMqtUGEDNxDfSj18Dd8Y8EBDGdtawNa") */
      extras:[]},
    {d:19, iso:"2027-02-26", topic:"General Exponentials", num:"2.7",
      note:D("12p85MymW3tprsal21NUHWnCMKH0oyzMK"),
      ans:"", /* key: D("1oxJ9cF0C06w6jJZvIa6Vy0u87Dcm1Dw4") */
      extras:[]},
    {d:20, iso:"2027-03-01", topic:"Derivatives of sin and cos", num:"2.8",
      note:D("1P40VjFJXU-GKMpbaFXavDMb1ZIl0T97E"),
      ans:"", /* key: D("1V27kE40OSy9AeSqIDyFoFspFci7GDwY9") */
      extras:[["Sine & Cosine Derivatives Practice", D("1N34bQwlz4Q0cDn_yORUAKtrPQ_6UK2k_"), "doc"],
              ["Answers", D("1_8Ffnga3NFjMPw_N2aFEcnNLdLDQ_BoB"), "ans"]]},
    {d:21, iso:"2027-03-02", topic:"Derivatives of tan; combinations", num:"2.9",
      note:D("1o-mKjagWiEIRGtcDqhaHcN1YbFoHSaCG"),
      ans:"", /* key: D("1FGe3jJRCahmlUJ_dc3R7N83f1zSNg5dx") */
      extras:[]},
    {d:22, iso:"2027-03-03", topic:"Mixed practice: Speed Quiz III", noteLabel:"Speed Quiz III",
      note:D("1dffjpJq_4s7-JPn73G9MPIIhdQkMv0uI"),
      ans:"", /* key: D("1nnlniSn5by4ZQV9oZ0UjHfNN4J2HVl6w") */
      extras:[["Derivative Formulas to Memorize", D("1Eq_ssFSV9sqgnHFDjj2GzP8B_Hu89DPM"), "doc"],
              ["Trig Rules Practice", D("1egp7UBrvQkoUmVxNMvHwXjJAkGHzYULu"), "doc"],
              ["Answers", D("1BvuAcqpmE4YSbCVIwl4EAUtfYBbszc46"), "ans"],
              ["Exponential Rules Practice", D("1VfSZj48liQlncO6-p3d_WCZfAhc1fbYJ"), "doc"],
              ["Answers", D("1hr6mdPga_lzhySIOhG90bAXLdHqlia0-"), "ans"]]},
    {d:23, iso:"2027-03-04", flag:"review", topic:"Practice Test", noteLabel:"U2 Practice Test",
      note:D("1KpfaobE55Y3ErnnbjpIDd78B3usSviCD"),
      ans:"", /* key: D("171R489nw1blqTYgzJrdx1TJvv-Xvk4lV") */
      extras:[]},
    {d:24, iso:"2027-03-05", flag:"test", covers:"Unit 2", topic:"",
      extras:[]},
  ]},

  /* ── APPLICATIONS OF DERIVATIVES ─────────────────────────── */
  {name:"Applications of Derivatives", days:[
    {d:25, iso:"2027-03-08", topic:"Second Derivatives & Motion", num:"3.1",
      note:D("1H3ig5PupucW5mRWhcFoRsOhlyi1DlXkv"),
      ans:"", /* key: D("1OpBL375v8748LsS-9pz-xYI3VJQQnMD-") */
      extras:[["Higher Order Derivative Practice", D("1WZYb0Ry3hfjvYJKpqmyNJJNdWuRtMRZl"), "doc"],
              ["Answers", D("1oX-tMGsZKX-CLyTy7W-e_GlKq6HHZoCt"), "ans"],
              ["Half Derivatives?", "https://www.youtube.com/watch?v=2dwQUUDt5Is", "vid"]]},
    {d:26, iso:"2027-03-09", topic:"Extrema", num:"3.2",
      note:D("1QDVtwKaAowz0jXPX5JkCbqPSaQju4X2y"),
      ans:"", /* key: D("1aHcdibWQpGCjo0jki1dL6PceSX3A18Z-") */
      extras:[]},
    {d:27, iso:"2027-03-10", topic:"Optimization I: geometry", num:"3.3",
      note:D("1f8s_9MPGF2_Y_sNr7PtBwMOfKa_QFvDe"),
      ans:"", /* key: D("1NLIutF29j4pt4cDiEqz12IoTvirh-l9_") */
      extras:[]},
    {d:28, iso:"2027-03-11", flag:"pquiz", covers:"3.1–3.3", topic:"Check-In", noteLabel:"U3 Practice Quiz",
      note:D("1afSb2lFr1v0Dm2gEzNnffIVSQhkwWmnB"),
      ans:"", /* key: D("1kU_MugBnO25_G2pK57ARbEzr6t3uR1Y9") */
      extras:[["SkyBlast Check-In", D("1qi8smige0HG46OD9Oxgc11j1WDQJ8LS_"), "doc"]]},
    {d:29, iso:"2027-03-12", topic:"Optimization II: economics, open domains", num:"3.4",
      note:D("1qKBSPqAe4Z8Nq1FUYTD0xo2C30kcgz5L"),
      ans:"", /* key: D("1O4boMNLGZpqQUH0B3ZN11SANSQkScXwf") */
      extras:[]},
    {d:30, iso:"2027-03-22", topic:"Optimization with Exponentials", num:"3.5",
      note:D("1p0yjVawXb6OyKwrSFM7yJcigmKfY33PL"),
      ans:"", /* key: D("1bfq-NzjM7uYrWb0NrxRl4ecpYNEVWsBO") */
      extras:[["Optimization Word Problems I & II", D("1m6nQW0Jc2heNBBSxNV2QcRWGaiNlonOs"), "doc"],
              ["Answers", D("1hXz0kk4lyxO_0HsNTZ0ipRJunTj0wuve"), "ans"]]},
    {d:31, iso:"2027-03-23", flag:"review", topic:"Unit 3 Review", noteLabel:"Unit 3 Review",
      note:D("1nfqUUNdVTNGfUtAUgjR-C5TYghNZkiAc"),
      ans:"", /* key: D("1s5wbI_WGX8iRO3eJIoLNkrWDaSO5iTQe") */
      extras:[]},
    {d:32, iso:"2027-03-24", flag:"review", topic:"Review / work period",
      extras:[["Review II", D("1-R9uPr0rmZJDYF2cqCa5uTZO33HhjB22"), "doc"],
              ["Answers", D("1FmD1LOFSLLXjKBPnKGvYmbrUuo9SflZy"), "ans"],
              ["Optimization Challenge", D("15n3ggfAG5k3I761K_-P0B1-6aVCNlFl6"), "doc"],
              ["Answers", D("1eLtJbo0FL7ew1a4Joym1HMUUNSwluZ7b"), "ans"]]},
    {d:33, iso:"2027-03-25", flag:"test", covers:"Unit 3", topic:"",
      extras:[]},
  ]},

  /* ── CURVE SKETCHING ─────────────────────────────────────── */
  {name:"Curve Sketching", days:[
    {d:34, iso:"2027-03-30", topic:"Increasing/Decreasing + Critical Points", num:"4.1",
      note:D("1MY7gdb3iLGddb2jPR0BWIY0Gz6qe2AI0"),
      ans:"", /* key: D("1EXUtVcD26pOaeLj1v_MuGACCNCfyphI1") */
      extras:[]},
    {d:35, iso:"2027-03-31", topic:"Graphs of f, f′ and f″", num:"4.2",
      note:D("1GYSo0fe6vMgD6vrMMO0pCOp9KNRhZE7Q"),
      ans:"", /* key: D("1mp-1gzqNaJhA1VBB9NoeAhVkVJcfB2tj") */
      extras:[]},
    {d:36, iso:"2027-04-01", topic:"Asymptotes", num:"4.3",
      note:D("1cIPbPsqveBhcgqMBOZCE87T-Q-uEOX44"),
      ans:"", /* key: D("1Z0_ftYe89MWK14O4X5a-TG21P2sqplU-") */
      extras:[]},
    {d:37, iso:"2027-04-02", topic:"Concavity + polynomial sketching", num:"4.4",
      note:D("1CkY-Ic9v2jSq8PZwStkn08ez77CGWord"),
      ans:"", /* key: D("1DHlD7K722caST4ELqsSRAs4N_NDyrJ13") */
      extras:[]},
    {d:38, iso:"2027-04-05", topic:"Oblique asymptotes + rational sketching", num:"4.5",
      note:D("1nmFUwl30d_mCYpvUeyBQd32GomyQxFdH"),
      ans:"", /* key: D("1znvatuUUzbPQoY63iQZfp50flUvuENri") */
      extras:[["Rational Functions Practice", D("13-VuIAXTP8wI6Bq5LuGb5Agt_cFeMf8B"), "doc"],
              ["Answers", D("138Y07JaUY_sbkYBEXeCHyyzeqYRWmloa"), "ans"]]},
    {d:39, iso:"2027-04-06", flag:"pquiz", covers:"4.1–4.5", topic:"Work period", noteLabel:"U4 Practice Quiz",
      note:D("19EilWNskD9Ua1-Yxgs-VVDm-JvpT2npw"),
      ans:"", /* key: D("1lbFFr_vFiT2AHdQsC8EfNhFKPJtLoP6e") */
      extras:[["HARD Curve Sketching Practice Quiz", D("1Kp3z4nzCxFNPexXpoD5tIn5tOYFCAh2C"), "doc"],
              ["Answers", D("1x0Gj-Mq5Put-BKm8F-G6Y3uq536s7fx3"), "ans"]]},
    {d:40, iso:"2027-04-07", flag:"review", topic:"Unit 4 Review", noteLabel:"Unit 4 Review",
      note:D("1O9FG8KE1bdsKfdV7RQ1_KrYjE7K-Mv8-"),
      ans:"", /* key: D("1t5DrlI7lM0N-Oe0SPGGNVCWQVG1rq4BM") */
      extras:[]},
    {d:41, iso:"2027-04-08", flag:"test", covers:"Unit 4", topic:"",
      extras:[]},
  ]},

  /* ── CALCULUS EXAM ───────────────────────────────────────── */
  {name:"Calculus Exam", noNumber:true, days:[
    {d:42, iso:"2027-04-09", flag:"review", topic:"Calculus review 1: practice exam", noteLabel:"Calculus Practice Exam", ansLabel:"Solutions",
      note:D("1W3zj5zZr9SC_gfI01WKXsUBZrRz32fuw"),
      ans:"", /* key: D("1e8BdYfZVr0c77kGBMBEDEdqaHDxsSlfD") */
      extras:[["Another Practice Exam (JensenMath)", D("1bb7dmdvLFdTQ_-TLh6b4NhogCEW0p18c"), "doc"],
              ["Video Solutions", "https://www.youtube.com/watch?v=-bykU5Y9Y48&t=32s", "vid"]]},
    {d:43, iso:"2027-04-12", flag:"review", topic:"Calculus review 2: retrieval by question type", noteLabel:"Calculus Review Stations", ansLabel:"Solutions",
      note:D("1KR1u4F2RJHbVvaeCHlV_MqdyzEHvTEFO"),
      ans:"", /* key: D("1VOZBZMz5U36QfZxtpXQHEzY1KeOSZhph") */
      extras:[["Cumulative Review of Calculus (textbook)", D("1Nv2P1BX19vWor2FV9DAxfQS5ftS9iDo_"), "doc"]]},
    {d:44, iso:"2027-04-13", flag:"exam", covers:"Calculus, Units 1–4", topic:"",
      extras:[]},
  ]},

  /* ── VECTORS ─────────────────────────────────────────────── */
  {name:"Vectors", days:[
    {d:45, iso:"2027-04-14", topic:"Trig Review", num:"5.1",
      /* 2026 textbook HW: Questions from today’s note */
      note:D("1H6nvrX6QQP-0HwU2YBdaR8iwY50RQuYR"),
      ans:"", /* key: D("1EmkQ3ys0CLQKQA2QMjVnmoqw_dAwjH4f") */
      extras:[["Right Angle Triangle Practice", D("1M7EI-Rk66vTMcYHfHvxg63xrZV4XiiaY"), "skills"],
              ["Sine & Cosine Law Practice", D("16wxf6U4K5SPPrlmrgbCcpTTVUReSx7Ym"), "skills"]]},
    {d:46, iso:"2027-04-15", topic:"Vectors", num:"5.2",
      /* 2026 textbook HW: §6.1 p. 279 #1, 2, 4, 5bce, 8ab, 9, 10 */
      note:D("1xi4E4BexF52jNsdfQpdPs35FZNH5eHuF"),
      ans:"", /* key: D("1NKlK0BOfU5wqO6p81_AxvH5lYw2482Oj") */
      extras:[["What Is a Vector?", "https://www.youtube.com/watch?v=ml4NSzCQobk", "vid"],
              ["What Is a Tensor?", "https://www.youtube.com/watch?v=f5liqUk0ZTw", "vid"]]},
    {d:47, iso:"2027-04-19", topic:"Vector Addition", num:"5.3",
      /* 2026 textbook HW: §6.2 p. 290 #4, 6, 8, 14 */
      note:D("1m0TcJ68pJBlosV9fzN-1r5RixZOfoJkh"),
      ans:"", /* key: D("1j1V2TUI9fwCcUqZkzm4ed8eCvCUv-ok9") */
      extras:[["Adding Vectors Made Simple", "https://www.youtube.com/watch?v=Emphi2zDMTo", "vid"]]},
    {d:48, iso:"2027-04-20", topic:"Scalar Multiplication", num:"5.4",
      /* 2026 textbook HW: §6.3 p. 298 #1, 5bc, 12, 20 · Extra: p. 298 #4cde, 7, 16, 21 */
      note:D("1LYLqr2qK655Ed9Offtps_CRlITiZ9SGL"),
      ans:"", /* key: D("1ZjijXyJoEOjIaBSpffF5tq9hr8YjNB4g") */
      extras:[]},
    {d:49, iso:"2027-04-21", topic:"Properties of Vectors: investigation", num:"5.5",
      /* 2026 textbook HW: §6.4 p. 306 #2, 4, 8a */
      note:D("1Sr1i8DYmWCLEJKYcnb4L042EOAtlLr-P"),
      ans:"", /* key: D("1H6Ft3SX-Wha4ayRD6_sKq8WFGkIWsXvs") */
      extras:[["Properties of Vectors", "https://www.youtube.com/watch?v=9F1cZUwQg9A", "vid"]]},
    {d:50, iso:"2027-04-22", topic:"Vectors in 3-Space", num:"5.6",
      /* 2026 textbook HW: §6.5 p. 316 #2, 6, 9, 14, 19 */
      note:D("177Sz6IJqNUHs-EursdQRwxDdt8uUmxRZ"),
      ans:"", /* key: D("1WKqdADWa6oFCPMUvaxwmohw7dZ83roGq") */
      extras:[["Desmos 3D", "https://www.desmos.com/3d", "doc"]]},
    {d:51, iso:"2027-04-23", topic:"Operations in Cartesian form", num:"5.7",
      /* 2026 textbook HW: §6.6/6.7 p. 324 #4, 5, 7b, 15 · p. 332 #3, 5b, 8 · Extra: p. 324 #1, 2, 11 · p. 332 #2, 4ac, 14 */
      note:D("130rrSPxQ7lG1m-fJrDwyRjoci7OeTV0m"),
      ans:"", /* key: D("1iF4YVxZrnpkel4OOj3exKtxsepLHetqe") */
      extras:[]},
    {d:52, iso:"2027-04-26", flag:"pquiz", covers:"5.2–5.7", topic:"", noteLabel:"U5 Practice Quiz",
      note:D("1zSoXhX2rlwRImRHLJigFIM5nzJl36cF9"),
      ans:"", /* key: D("1SMze7E86ZjrBiPBgPatYJ-OSbC8w0m6v") */
      extras:[]},
    {d:53, iso:"2027-04-27", topic:"Linear Combinations", num:"5.8",
      /* 2026 textbook HW: §6.8 p. 340 #2, 6, 10, 11, 14 · Extra: p. 340 #1, 7b, 13a */
      note:D("1Jabrn0tzrOsqUnhS5oy3IaoC4n_7sZ9L"),
      ans:"", /* key: D("137BcykfwIsMFtMEYfPflSvLzGl03wFHG") */
      extras:[["Linear Combinations, Span & Basis", "https://www.youtube.com/watch?v=k7RM-ot2NWY", "vid"]]},
    {d:54, iso:"2027-04-28", flag:"review", topic:"Unit 5 Review", noteLabel:"Unit 5 Review",
      /* 2026 textbook HW: p. 344 #1, 2a, 4, 10, 17 */
      note:D("1LorOSp_yjQJNLpfVwugU3bwUrfdABaLj"),
      ans:"", /* key: D("18lzoK7x1HIqu_Wjns1Y0oXGM1baVGTYj") */
      extras:[]},
    {d:55, iso:"2027-04-29", flag:"test", covers:"Unit 5", topic:"",
      extras:[]},
  ]},

  /* ── VECTOR PRODUCTS ─────────────────────────────────────── */
  {name:"Vector Products", days:[
    {d:56, iso:"2027-04-30", topic:"Forces & Velocities", num:"6.1",
      /* 2026 textbook HW: §7.1/7.2 p. 362 #1, 3, 5, 6, 11 · p. 369 #1, 2, 4, 6, 10, 13 */
      note:D("19z368z4L5DzzLgYLDNkQe6nN5M_ED4_B"),
      ans:"", /* key: D("1BB3H5ZNuX2Kkyq3nhWjqS71XbNtnXK_o") */
      extras:[]},
    {d:57, iso:"2027-05-03", topic:"Dot Product (geometric)", num:"6.2",
      /* 2026 textbook HW: §7.3 p. 377 #3, 5, 7c, 12a, 16 */
      note:D("16a9olqafo-mO-3WzPXljT8y3Blqk59gV"),
      ans:"", /* key: D("1YF-bUS_A7cCrbLy6tbUHQGNNDKtmFMGh") */
      extras:[["Dot Products & Duality", "https://www.youtube.com/watch?v=LyGKycYT2v0", "vid"]]},
    {d:58, iso:"2027-05-04", topic:"Dot Product (algebraic)", num:"6.3",
      /* 2026 textbook HW: §7.4 p. 385 #1, 6d, 7a, 14, 19 */
      note:D("1AQtVpTuUfkwxJ00GJcdYXPIOrLqgns2V"),
      ans:"", /* key: D("1eMMSGMFeBkzZDw5PYKCSNTKLup3jaMy7") */
      extras:[]},
    {d:59, iso:"2027-05-05", topic:"Projections", num:"6.4",
      /* 2026 textbook HW: §7.5 p. 398 #1, 8a, 11, 14 · Extra: p. 398 #3, 7b, 10, 15a */
      note:D("14HcYUAHornTITrCqq3EQYQ1_yUoH1FFq"),
      ans:"", /* key: D("1FCJC6CUkd77DetdqhWUMUaO0-bwlDRTO") */
      extras:[]},
    {d:60, iso:"2027-05-06", flag:"pquiz", covers:"6.1–6.4", topic:"", noteLabel:"U6 Practice Quiz",
      note:D("1tomU-nisp9WZRB1-xcuF7FHiqLJJgnBD"),
      ans:"", /* key: D("1IRGx-RTZtBjHwGlBT9Dx-LQgINUymWKN") */
      extras:[]},
    {d:61, iso:"2027-05-07", topic:"Cross Product: investigation", num:"6.5",
      /* 2026 textbook HW: §7.6 p. 407 #1, 4c, 5, 13 · Extra: p. 407 #4f, 7, 9ac */
      note:D("1_e1c9W0ahrkwEFPqn0sf2VeY5Aqy4qc5"),
      ans:"", /* key: D("1MLcTku_ILwU0PLSZ6VTxcJ7ShglkXehI") */
      extras:[["Cross Product Interactive", "http://mechanicsmap.psu.edu/websites/A1_vector_math/A1-4_crossproduct/crossproduct.html", "doc"],
              ["Cross Product Explained", "https://www.youtube.com/watch?v=eu6i7WJeinw", "vid"]]},
    {d:62, iso:"2027-05-10", topic:"Applications: work, torque, area, volume", num:"6.6",
      /* 2026 textbook HW: §7.7 p. 414 #1, 2, 5a, 8 */
      note:D("1AYhWOhsMQ0HHa5IRlbp2qbi7mZduYFke"),
      ans:"", /* key: D("1RwafR4vpibykWyNlZpIWZV3Rvpbc4gBs") */
      extras:[]},
    {d:63, iso:"2027-05-11", flag:"review", topic:"Unit 6 Review", noteLabel:"Unit 6 Review",
      /* 2026 textbook HW: p. 418 #1, 2ad, 5, 7, 9, 13, 16a, 22, 29, 32 */
      note:D("1IamqqHaftma37qxTL66lA-tnmXdNfl8z"),
      ans:"", /* key: D("13iehZzRYv3Km-tWBM41pVwbNX-uoFNDa") */
      extras:[["Play Vectors Connections", "https://mathbrown.com/Vectors-Connections/", "doc"]]},
    {d:64, iso:"2027-05-12", flag:"review", topic:"Consolidation: which product, what output?", noteLabel:"Which Product?",
      note:D("153dDLMdkK5t3ya2cEAuPgsoIA08Prqwd"),
      ans:"", /* key: D("1CCCcOuxyC6Sq49c1eY-TSBeLgK3oQbzF") */
      extras:[]},
    {d:65, iso:"2027-05-13", flag:"test", covers:"Unit 6", topic:"",
      extras:[]},
  ]},

  /* ── LINES & PLANES ──────────────────────────────────────── */
  {name:"Lines & Planes", days:[
    {d:66, iso:"2027-05-14", topic:"Vector & Parametric Equations of a Line", num:"7.1",
      /* 2026 textbook HW: §8.1 p. 433 #1, 4, 5a, 10 · Extra: p. 433 #2, 7, 14 */
      note:D("1H-Az9ObAmC37KoU2Xlnt0jg7aIiDXB6u"),
      ans:"", /* key: D("1pp72mAc-piEiJZtRpEYo4fDExTi8OkFU") */
      extras:[]},
    {d:67, iso:"2027-05-17", topic:"Cartesian Equation of a Line", num:"7.2",
      /* 2026 textbook HW: §8.2 p. 443 #1, 3c, 8, 14 · Extra: p. 443 #4ad, 5, 6 */
      note:D("1kdtV65VCTMD3oWUOHfIdeyE9qaRVQQYR"),
      ans:"", /* key: D("16QZxJiuzNGnsdUfav65xKjhmO35byquK") */
      extras:[]},
    {d:68, iso:"2027-05-18", topic:"Lines in R³", num:"7.3",
      /* 2026 textbook HW: §8.3 p. 449 #1d, 4, 6, 13 · Extra: p. 449 #1ef, 8 */
      note:D("1pbZo762a4oB7pvyoScG_xsiAgpHDxVyD"),
      ans:"", /* key: D("14iGZ1mG_0uwCssHSRCGInzFJgY9f_NNb") */
      extras:[]},
    {d:69, iso:"2027-05-19", topic:"Vector & Parametric Equations of a Plane", num:"7.4",
      /* 2026 textbook HW: §8.4 p. 459 #3, 5, 7, 15 · Extra: p. 459 #1, 4a, 10 */
      note:D("1MHKUl1rMMMYyyIGzISoKwwOpTolSPoBW"),
      ans:"", /* key: D("1xMFIF9Ex8SkeKOreYJgSasR4-Xd5Rpn6") */
      extras:[["Lines & Planes Practice Quiz", D("1jtRM6UcIRHVMGv7yEWCou6MEdradTr3d"), "doc"],
              /* key: ["Lines & Planes Practice Quiz: Answers", D("1xFkzKmMtQTwcPdApwTUg5tCpmJscgcdD"), "ans"] */]},
    {d:70, iso:"2027-05-20", topic:"Cartesian Equation of a Plane", num:"7.5",
      /* 2026 textbook HW: §8.5 p. 468 #1ab, 4a, 7, 14 · Extra: p. 468 #2ab, 8, 9a */
      note:D("11R6TkQ3N2C6sDaVUDIiwQlIiObN-ml28"),
      ans:"", /* key: D("1aSGpxO40G5XUKxEv1AVLEotj70K6TNav") */
      extras:[]},
    {d:71, iso:"2027-05-21", topic:"Sketching Planes + Desmos 3D", num:"7.6",
      /* 2026 textbook HW: §8.6 p. 476 #1, 2, 3, 6, 7, 8ad, 9 */
      note:D("1NOf65TwjDI6eT1UZpQkHpTS-BDy2bAPw"),
      ans:"", /* key: D("1gVTWkuvSwrlP1y6HBeQsCJ71Bpd87ci0") */
      extras:[["Desmos 3D", "https://www.desmos.com/3d", "doc"]]},
    {d:72, iso:"2027-05-25", flag:"review", topic:"U7 Part 1 Review", noteLabel:"U7 Part 1 Review",
      /* 2026 textbook HW: p. 480 #2, 3a, 4, 8, 14d, 15a, 17, 22, 25, 34 */
      note:D("1BLtz-xmlD32aDhkLVUhp3kE4eByfrzC_"),
      ans:"", /* key: D("1eKAY8qg7R1vFG353soYjNmNad8YXZlRr") */
      extras:[]},
    {d:73, iso:"2027-05-26", flag:"test", covers:"Unit 7 Part 1 (7.1–7.6)", topic:"",
      extras:[]},
    {d:74, iso:"2027-05-27", topic:"Intersection of a Line & a Plane", num:"7.7",
      /* 2026 textbook HW: §9.1 p. 496 #2b, 4a, 7a, 10 */
      note:D("1L5wtnDP0L-8XbQ0uCB1MLWi7J6rZtD5r"),
      ans:"", /* key: D("17Uh6kFEJFiN95f_Cm4G1zUhNx0EGOfxu") */
      extras:[]},
    {d:75, iso:"2027-05-28", topic:"Intersection of Two Lines", num:"7.8",
      /* 2026 textbook HW: §9.1 p. 496 #8b, 9, 10, 11a, 15, 18; worked #18: D("1x6Qu4_EfIPnPGa-LYZsQBJxomfHaCCec") */
      note:D("18siHFqzh6UG9G6_sUriHTG1OT-c6RWaE"),
      ans:"", /* key: D("1VYbYcM9ja9KgRnKlAEAUDYpJfD4XE5UM") */
      extras:[]},
    {d:76, iso:"2027-05-31", topic:"Systems of Equations (+ matrix notation)", num:"7.9",
      /* 2026 textbook HW: §9.2 p. 507 #1, 2, 5b, 9, 12f, 14 */
      note:D("1NJ4H1tErFzQPHwVeWv4CkOOJYdkr49FO"),
      ans:"", /* key: D("1XNUrMLefq57BuvYLZ8-0psz0492czLEa") */
      extras:[["Systems of Equations Challenge (optional)", D("1ZzJQKAh8vA5EyZfCWD70sXU3cLXGznjg"), "doc"]]},
    {d:77, iso:"2027-06-01", topic:"Intersection of Two Planes", num:"7.10",
      /* 2026 textbook HW: §9.3 p. 516 #1, 2, 6c */
      note:D("1b6cL89eVkXPZA-2wjx4q4Wupx64_WlNS"),
      ans:"", /* key: D("1n0YndJb59xqK8nYqOTsMeb5CGbEpaIzk") */
      extras:[]},
    {d:78, iso:"2027-06-02", flag:"pquiz", covers:"7.7–7.10", topic:"", noteLabel:"Intersections Practice Quiz",
      note:D("1jT5wS9UOXrB7IdR7fKOBnzxm6ayqCsyD"),
      ans:"", /* key: D("1cB2MeA_fXRIjVhxX6fMsKuozkKFAsgwj") */
      extras:[]},
    {d:79, iso:"2027-06-03", topic:"Intersection of Three Planes: the eight cases", num:"7.11",
      /* 2026 textbook HW: §9.4 p. 530 #5, 8a, 12ad, 15 */
      note:D("13tDGtxc96VLJ8ccs2-Vj2BhVxCrYCnCD"),
      ans:"", /* key: D("12HNUZYSVPSt9hjhaOMgXPnwdTuOA_cU-") */
      extras:[["Desmos 3D", "https://www.desmos.com/3d", "doc"]]},
    {d:80, iso:"2027-06-04", topic:"Interpreting Three-Plane Systems", num:"7.12",
      note:D("1D756MyaPF1_8C4w-Wjcp0R3wp3G2eCte"),
      ans:"", /* key: D("18QVOki6Eqa8QSf8Ld_yWSMjAoZumN7vs") */
      extras:[]},
    {d:81, iso:"2027-06-07", topic:"Distance: Point to Line", num:"7.13",
      /* 2026 textbook HW: p. 540 #1b, 4a · Extra: p. 540 #3a */
      note:D("12MjR12kt3052d46u42Sv6QE-rgr_ha1s"),
      ans:"", /* key: D("1qFjh8FDSBFUbDVMq3gamZXJwsqybfZ7q") */
      extras:[]},
    {d:82, iso:"2027-06-08", topic:"Distance: Point to Plane + Skew Lines", num:"7.14",
      /* 2026 textbook HW: §9.6 p. 549 #1, 2ae, 3, 5, 7, 8 */
      note:D("1Yr_0zVlRrgYVDlz88ONT9vQ-akWDZMxo"),
      ans:"", /* key: D("1JoqYX3s0-YwqgYQFtfB3r5Bowbt02yPS") */
      extras:[]},
    {d:83, iso:"2027-06-09", flag:"review", topic:"U7 Part 2 Review", noteLabel:"U7 Part 2 Review",
      /* 2026 textbook HW: p. 552 #1–4, 7, 9a, 12a, 15, 18, 22 */
      note:D("1E57-ZZjMLi-NH6bGR35ukSxU6EI1WAbs"),
      ans:"", /* key: D("102QPotVQz6-ejOCxoZHymY9t8fPZCiNl") */
      extras:[]},
    {d:84, iso:"2027-06-10", flag:"test", covers:"Unit 7 Part 2 (7.7–7.14)", topic:"",
      extras:[]},
  ]},

  /* ── VECTORS EXAM REVIEW ─────────────────────────────────── */
  {name:"Vectors Exam Review", noNumber:true, days:[
    {d:85, iso:"2027-06-11", flag:"review", topic:"Vectors exam review 1: practice exam",
      /* 2026 textbook HW: p. 557 #1–36 */
      extras:[["Vectors Exam Review (2026)", D("19WVvGTQtPz26r5fAJ0HV48en8eEQ_bkn"), "doc"],
              ["Full Solutions", D("1-kEnOCKBLlQUsKkV5m0bNNJSbRFniKl4"), "ans"]]},
    {d:86, iso:"2027-06-14", flag:"review", topic:"Vectors exam review 2: retrieval by question type",
      extras:[]},
    {d:87, iso:"2027-06-15", flag:"review", topic:"Vectors exam review 3",
      extras:[]},
    {d:88, iso:"2027-06-16", flag:"review", topic:"Last class · Exam review",
      extras:[]},
  ]},

  ],
};
