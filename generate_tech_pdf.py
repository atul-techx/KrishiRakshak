import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch, cm

def create_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette matching KrishiRakshak
    c_primary = colors.HexColor('#4a3527')     # Deep Earth Brown
    c_secondary = colors.HexColor('#6b4f3a')   # Warm Brown
    c_accent = colors.HexColor('#b97935')      # Harvest Amber
    c_bg_light = colors.HexColor('#fcf8f2')    # Off-white warm paper
    c_card_bg = colors.HexColor('#f7efe4')     # Beige card
    c_green = colors.HexColor('#2e7d32')       # Agri Green
    c_dark = colors.HexColor('#26201a')        # Dark Ink
    c_muted = colors.HexColor('#705e4f')       # Muted Brown
    c_border = colors.HexColor('#ded3c2')      # Subtle Line

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_accent,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=c_primary,
        spaceBefore=12,
        spaceAfter=8
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_secondary,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_dark
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=c_primary
    )

    flow_box_title = ParagraphStyle(
        'FlowTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.white
    )

    flow_box_desc = ParagraphStyle(
        'FlowDesc',
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#fcf8f2')
    )

    table_header_style = ParagraphStyle(
        'TH',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TC',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TCB',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=c_primary
    )

    story = []

    # ================= PAGE 1: TITLE & EXECUTIVE SUMMARY =================
    header_data = [
        [
            Paragraph("<b>KrishiRakshak · Farmer Intelligence Platform</b>", ParagraphStyle('TopSub', fontName='Helvetica-Bold', fontSize=10, textColor=c_accent)),
            Paragraph("<b>Technical Approach & Tech Stack</b>", ParagraphStyle('TopDate', fontName='Helvetica', fontSize=9, textColor=c_muted, alignment=2))
        ]
    ]
    t_head = Table(header_data, colWidths=[360, 160])
    t_head.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_head)
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=2, spaceAfter=14))

    story.append(Paragraph("System Architecture & Technical Approach", title_style))
    story.append(Paragraph("End-to-End Technical Workflow, Edge-to-Cloud Pipeline, and Component Breakdown for Hackathon / SIH Presentation", subtitle_style))

    # High Level Summary Box
    summary_text = (
        "<b>Executive Summary:</b> KrishiRakshak is a farmer-first intelligence ecosystem built on an "
        "<b>offline-first Progressive Web App (PWA)</b> architecture. It seamlessly integrates on-device "
        "<b>Edge AI (ONNX WebAssembly)</b> for instantaneous offline disease diagnosis with cloud-based "
        "<b>Multi-Model Second-Opinion consensus</b>. The platform couples diagnosis with real-time "
        "<b>Agmarknet APMC live market prices</b>, weather-aware crop disease risk forecasting, and a community-driven "
        "<b>Peer-to-Peer (P2P) Machinery Rental Hub</b> integrated directly with WhatsApp click-to-chat."
    )
    summary_table = Table([[Paragraph(summary_text, body_style)]], colWidths=[520])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 14))

    # Technical Workflow Pipeline (Visual Flow Steps)
    story.append(Paragraph("1. Technical Approach Flow Pipeline (Step-by-Step)", h1_style))
    story.append(Paragraph("The system operates in a resilient 5-stage pipeline transitioning seamlessly from local edge execution to cloud synchronization:", body_style))
    story.append(Spacer(1, 8))

    flow_steps = [
        ("STAGE 1: INPUT & LEAF PRE-VERIFICATION",
         "• Farmer captures or uploads leaf photo (JPG/PNG/WEBP)\n• Client-side validation verifies daylight, sharpness & leaf presence\n• Context parameters captured: Crop variety, Growth stage, Soil & Irrigation"),
        ("STAGE 2: EDGE INFERENCE (OFFLINE ZERO-LATENCY)",
         "• OnnxRuntime WebAssembly runs lightweight quantized MobileNet/ResNet model inside browser worker\n• Instant offline classification without requiring active internet\n• Generates top-3 disease candidates with calibrated confidence scores"),
        ("STAGE 3: CLOUD SECOND-OPINION CONSENSUS",
         "• If internet is active and edge confidence < 80%, request triggers dual-check pipeline\n• Server-side microservice proxies second-opinion models (Kindwise/AgroStack/Gemini Vision)\n• Weighted consensus algorithm reconciles disagreements and flags uncertain cases"),
        ("STAGE 4: TRIAGE & MULTI-SIGNAL RISK FORECAST",
         "• Real-time weather integration: Temperature, humidity, 24h rainfall & leaf wetness\n• Heuristic priority matrix: +35% symptom share, pest trap spikes (>50%), rapid spread\n• Generates localized agronomic advisory: Chemical & biological treatments + safety guidelines"),
        ("STAGE 5: ACTION LOOP, MANDI RATES & P2P MACHINERY",
         "• Live Mandi Bhav: Fetches real-time APMC modal auction rates from National Agmarknet DB\n• Machinery Rental Hub: Connects local farmers via WhatsApp click-to-chat for equipment sharing\n• Human-in-the-loop: Complex cases escalated to district agricultural experts with follow-up tracking")
    ]

    flow_table_data = []
    for title, desc in flow_steps:
        p_title = Paragraph(f"<b>{title}</b>", flow_box_title)
        p_desc = Paragraph(desc.replace('\n', '<br/>'), flow_box_desc)
        flow_table_data.append([p_title])
        flow_table_data.append([p_desc])

    flow_table = Table([[t] for row in flow_table_data for t in row], colWidths=[520])
    ts = [
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e8dfd4')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]
    # Color alternating headers
    for i in range(0, len(flow_table_data), 2):
        ts.append(('BACKGROUND', (0, i), (-1, i), c_secondary))
        ts.append(('BACKGROUND', (0, i+1), (-1, i+1), colors.HexColor('#fffdf9')))
    flow_table.setStyle(TableStyle(ts))
    story.append(flow_table)

    story.append(PageBreak())

    # ================= PAGE 2: ARCHITECTURE FLOW DIAGRAM =================
    story.append(Paragraph("2. System Architecture & Flow Diagram (PPT Ready)", h1_style))
    story.append(Paragraph("Copy the following structured flow diagram or Mermaid block architecture into your presentation:", body_style))
    story.append(Spacer(1, 8))

    diagram_ascii = """
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER (OFFLINE-FIRST PWA)                               │
├────────────────────────────────┬────────────────────────────────┬───────────────────────────────┤
│    Crop Sentinel (Field UI)    │  Edge AI Engine (WebAssembly)  │  Offline Store (IndexedDB)    │
│  • Leaf Photo & Camera Input   │  • ONNX Runtime Web v1.29      │  • Local Field Observations   │
│  • Voice TTS & Transliteration │  • Quantized CNN Classification│  • Cached Mandi Prices        │
│  • Marathi / Hindi / Hinglish  │  • Sub-100ms Inference         │  • P2P Machinery Listings     │
└────────────────────────────────┼────────────────────────────────┴───────────────────────────────┘
                                 │ Sync / API Requests (when online)
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                BACKEND & API GATEWAY (Node.js ESM)                               │
├────────────────────────────────┬────────────────────────────────┬───────────────────────────────┤
│      /api/market-prices        │       /api/second-opinion      │       /api/weather-risk       │
│  • Live Agmarknet APMC Parser  │  • Dual-Check Multi-Model      │  • Open-Meteo & IMD Feeds     │
│  • 350+ Live Mandi Records     │  • Consensus & Arbitration     │  • Relative Humidity & Wetness│
│  • MSP Benchmark Comparator    │  • Confidence Calibration      │  • Pest Trapping Spikes Heur. │
└────────────────────────────────┴────────────────────────────────┴───────────────────────────────┘
                                 │ External Integrations
                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             EXTERNAL APIS & COMMUNITY NETWORKS                                   │
├────────────────────────────────┬────────────────────────────────┬───────────────────────────────┤
│   Government of India Data     │      AI Second Opinions        │    WhatsApp P2P Network       │
│  • Agmarknet APMC Portal       │  • Agricultural Vision APIs    │  • wa.me Click-to-Chat        │
│  • MSP Benchmarks (2024-25)    │  • Expert Escalation System    │  • Peer-to-Peer Rental Hub    │
└────────────────────────────────┴────────────────────────────────┴───────────────────────────────┘
"""

    diag_table = Table([[Paragraph(f"<pre>{diagram_ascii.strip()}</pre>", code_style)]], colWidths=[520])
    diag_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#2c221a')),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#e8dfd4')),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(diag_table)
    story.append(Spacer(1, 14))

    # Core Architectural Principles
    story.append(Paragraph("Key Architectural Principles:", h2_style))
    principles_data = [
        [
            Paragraph("<b>Zero-Latency Edge Execution:</b><br/>Inference happens in WebAssembly on the farmer's mobile browser without sending photos across weak 2G/3G rural networks.", body_style),
            Paragraph("<b>Fail-Safe Dual Model Check:</b><br/>If cloud is reachable, edge predictions are cross-checked against authoritative agronomic APIs to eliminate false positives.", body_style)
        ],
        [
            Paragraph("<b>Pure Live Agmarknet Mandi Data:</b><br/>No synthetic or mocked market data. Direct ingestion of 350+ live APMC auction records with MSP floor validation.", body_style),
            Paragraph("<b>Community P2P Resource Optimization:</b><br/>Enables neighboring farmers to rent out idle machinery via direct WhatsApp links without platform commission.", body_style)
        ]
    ]
    t_princ = Table(principles_data, colWidths=[255, 255])
    t_princ.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_card_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_princ)

    story.append(PageBreak())

    # ================= PAGE 3: COMPREHENSIVE TECH STACK =================
    story.append(Paragraph("3. Comprehensive Tech Stack Breakdown", h1_style))
    story.append(Paragraph("Complete breakdown of languages, frameworks, edge engines, and third-party APIs:", body_style))
    story.append(Spacer(1, 8))

    stack_rows = [
        [Paragraph("<b>Layer / Domain</b>", table_header_style),
         Paragraph("<b>Technologies & Frameworks</b>", table_header_style),
         Paragraph("<b>Version / Specification</b>", table_header_style),
         Paragraph("<b>Role in KrishiRakshak</b>", table_header_style)],
        
        [Paragraph("<b>Frontend & UI</b>", table_cell_bold),
         Paragraph("HTML5, Vanilla JavaScript (ES2022+), CSS3 Design System", table_cell_style),
         Paragraph("Responsive, Flexbox / CSS Grid, CSS Variables", table_cell_style),
         Paragraph("Zero heavy bundle overhead, ultra-fast 60fps mobile execution.", table_cell_style)],
        
        [Paragraph("<b>Progressive Web App</b>", table_cell_bold),
         Paragraph("Service Workers API, CacheStorage, Web App Manifest", table_cell_style),
         Paragraph("PWA Specification, Cache-First Shell Strategy", table_cell_style),
         Paragraph("100% offline functionality in remote farmland areas.", table_cell_style)],

        [Paragraph("<b>Edge AI & ML</b>", table_cell_bold),
         Paragraph("ONNX Runtime Web (Wasm), Quantized CNNs", table_cell_style),
         Paragraph("ONNX Runtime v1.29.0, SIMD Wasm Threading", table_cell_style),
         Paragraph("Sub-100ms on-device leaf disease classification.", table_cell_style)],

        [Paragraph("<b>Cloud AI & Consensus</b>", table_cell_bold),
         Paragraph("Multi-Model Vision APIs, Dual-Check Consensus Engine", table_cell_style),
         Paragraph("REST / HTTPS Microservices, Node ESM", table_cell_style),
         Paragraph("Second-opinion verification, eliminating hallucinations.", table_cell_style)],

        [Paragraph("<b>Backend & APIs</b>", table_cell_bold),
         Paragraph("Node.js, Express / Native HTTP ESM, Vercel Serverless", table_cell_style),
         Paragraph("Node v20+, Vercel Edge Runtime", table_cell_style),
         Paragraph("Lightweight, auto-scaling API gateway and reverse proxy.", table_cell_style)],

        [Paragraph("<b>Mandi Market Data</b>", table_cell_bold),
         Paragraph("National Agmarknet APMC Portal API, data.gov.in", table_cell_style),
         Paragraph("Resource ID: 35985678-0d79-46b4-9ed6-6f13308a1d24", table_cell_style),
         Paragraph("350+ live mandi daily modal prices across all Indian states.", table_cell_style)],

        [Paragraph("<b>Weather & Agronomy</b>", table_cell_bold),
         Paragraph("Open-Meteo High-Resolution Agro Weather API", table_cell_style),
         Paragraph("Hourly Forecast, 2m Humidity, Soil Temperature", table_cell_style),
         Paragraph("Disease outbreak risk modeling based on microclimate.", table_cell_style)],

        [Paragraph("<b>P2P Machinery Hub</b>", table_cell_bold),
         Paragraph("WhatsApp Click-to-Chat Deep-linking, Geolocation API", table_cell_style),
         Paragraph("wa.me protocol, Haversine Distance Filter", table_cell_style),
         Paragraph("Direct farmer-to-farmer equipment rental and inquiries.", table_cell_style)],

        [Paragraph("<b>Audio & Speech TTS</b>", table_cell_bold),
         Paragraph("Web Speech API, SpeechSynthesis, Devanagari Romanizer", table_cell_style),
         Paragraph("W3C Speech API, Transliteration Fallback", table_cell_style),
         Paragraph("Natural voice advisories for farmers regardless of literacy.", table_cell_style)],

        [Paragraph("<b>Internationalization</b>", table_cell_bold),
         Paragraph("Custom Zero-Dependency i18n Dictionary Engine", table_cell_style),
         Paragraph("Bidirectional String Mapping (English, Hindi, Marathi)", table_cell_style),
         Paragraph("Instant language switching with zero runtime latency.", table_cell_style)],

        [Paragraph("<b>Client Storage</b>", table_cell_bold),
         Paragraph("HTML5 LocalStorage, IndexedDB", table_cell_style),
         Paragraph("W3C Web Storage", table_cell_style),
         Paragraph("Persistent offline storage for scans, crops, and listings.", table_cell_style)],
    ]

    t_stack = Table(stack_rows, colWidths=[90, 160, 130, 140])
    t_stack.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('ALIGN', (0,0), (-1,0), 'LEFT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#ffffff'), colors.HexColor('#faf6f0')])
    ]))
    story.append(t_stack)
    story.append(Spacer(1, 14))

    # PPT Tips Section
    story.append(Paragraph("Tips for Presenting this Technical Slide:", h2_style))
    tips_data = [
        "1. <b>Emphasize 'Edge-First, Cloud-Assisted':</b> Explain that edge AI works even in deep rural areas with 0 internet, and cloud only steps in for second opinions.",
        "2. <b>Highlight Authentic Data:</b> Clarify that Agmarknet mandi rates are 100% genuine live government records, backed by official MSP floor benchmarks.",
        "3. <b>Showcase Social Impact of P2P Rental:</b> Explain how smallholder farmers can access expensive equipment (like laser levelers or spray drones) through WhatsApp without paying middleman commissions."
    ]
    for tip in tips_data:
        story.append(Paragraph(f"• {tip}", body_style))
        story.append(Spacer(1, 3))

    doc.build(story)
    print(f"Successfully generated PDF: {filename}")

if __name__ == '__main__':
    out_path = os.path.join(os.path.dirname(__file__), 'KrishiRakshak_Technical_Approach_and_Tech_Stack.pdf')
    create_pdf(out_path)
