import { useState } from "react";
import {
  FileText, Upload, CheckCircle, Clock, XCircle, ChevronRight,
  Building2, User, Shield, QrCode, Globe, Menu, X, AlertCircle,
  Download, Eye, Star, Newspaper, Radio, Tv, Monitor, Check
} from "lucide-react";

const translations = {
  kh: {
    systemName: "ប្រព័ន្ធគ្រប់គ្រងការស្នើសុំអាជ្ញាបណ្ណសារព័ត៌មាន",
    systemNameSub: "ក្រសួងព័ត៌មាន នៃព្រះរាជាណាចក្រកម្ពុជា",
    nav: ["ទំព័រដើម", "ស្នើសុំ", "ស្ថានភាព", "ជំនួយ"],
    stepLabels: ["ព័ត៌មានស្ថាប័ន", "ព័ត៌មានម្ចាស់", "ឯកសារ", "បញ្ជាក់"],
    mediaOutlet: "ព័ត៌មានអង្គភាពសារព័ត៌មាន",
    mediaName: "ឈ្មោះស្ថាប័នសារព័ត៌មាន",
    mediaNamePh: "ឧ. កាសែតភ្នំពេញប៉ុស្ដិ៍",
    mediaType: "ប្រភេទប្រព័ន្ធផ្សព្វផ្សាយ",
    address: "អាស័យដ្ឋាន",
    addressPh: "ខេត្ត/ក្រុង, ស្រុក/ខណ្ឌ",
    phone: "លេខទូរស័ព្ទ",
    email: "អ៊ីម៉ែល",
    licenseeInfo: "ព័ត៌មានម្ចាស់អាជ្ញាបណ្ណ",
    ownerName: "ឈ្មោះម្ចាស់",
    ownerNamePh: "ឈ្មោះពេញ",
    idCard: "លេខអត្តសញ្ញាណប័ណ្ណ",
    idCardPh: "000 000 000",
    nationality: "សញ្ជាតិ",
    position: "តួនាទី",
    positionPh: "នាយក/ប្រធាន",
    documents: "ការបញ្ចូលឯកសារ",
    docDesc: "ឯកសារដែលត្រូវការ (PDF, JPG, PNG · អតិបរមា 5MB)",
    educationCert: "វិញ្ញាបនបត្រការសិក្សា",
    criminalRecord: "លិខិតបញ្ជាក់គ្មានទោស",
    businessLicense: "ប័ណ្ណបើកអាជីវកម្ម",
    uploadBtn: "ជ្រើសរើសឯកសារ",
    uploaded: "បានបញ្ចូល",
    confirm: "ការបញ្ជាក់",
    confirmDesc: "សូមពិនិត្យព័ត៌មានឡើងវិញមុននឹងដាក់ស្នើ",
    submit: "ដាក់ស្នើ",
    next: "បន្ទាប់",
    back: "ថយក្រោយ",
    statusTitle: "ស្ថានភាពអាជ្ញាបណ្ណ",
    appId: "លេខដំណើរការ",
    pending: "កំពុងពិនិត្យ",
    approved: "បានអនុម័ត",
    expired: "ផុតកំណត់",
    rejected: "បានបដិសេធ",
    certTitle: "អាជ្ញាបណ្ណសារព័ត៌មាន",
    certBody: "ប្រព័ន្ធផ្សព្វផ្សាយ",
    issuedBy: "ចេញដោយ​​: ក្រសួងព័ត៌មាន",
    validUntil: "សុពលភាព",
    scanVerify: "ស្កែន QR ដើម្បីផ្ទៀងផ្ទាត់",
    types: { online: "អនឡាញ", tv: "ទូរទស្សន៍", radio: "វិទ្យុ", print: "ព័ត៌មានក្រដាស" },
    applications: "ការស្នើសុំថ្មីៗ",
    ministry: "ក្រសួងព័ត៌មាន",
  },
  en: {
    systemName: "Media Licensing Management System",
    systemNameSub: "Ministry of Information, Kingdom of Cambodia",
    nav: ["Home", "Apply", "Status", "Help"],
    stepLabels: ["Outlet Info", "Licensee Info", "Documents", "Review"],
    mediaOutlet: "Media Outlet Information",
    mediaName: "Media Outlet Name",
    mediaNamePh: "e.g. Phnom Penh Post",
    mediaType: "Media Type",
    address: "Address",
    addressPh: "Province/City, District",
    phone: "Phone Number",
    email: "Email Address",
    licenseeInfo: "Licensee Information",
    ownerName: "Owner Full Name",
    ownerNamePh: "Full legal name",
    idCard: "National ID Number",
    idCardPh: "000 000 000",
    nationality: "Nationality",
    position: "Position/Title",
    positionPh: "Director / Chairman",
    documents: "Document Upload",
    docDesc: "Required documents (PDF, JPG, PNG · Max 5MB each)",
    educationCert: "Education Certificate",
    criminalRecord: "Criminal Record Clearance",
    businessLicense: "Business Registration",
    uploadBtn: "Choose File",
    uploaded: "Uploaded",
    confirm: "Review & Confirm",
    confirmDesc: "Please review all information before submitting",
    submit: "Submit Application",
    next: "Next",
    back: "Back",
    statusTitle: "License Status Tracker",
    appId: "Application ID",
    pending: "Under Review",
    approved: "Approved",
    expired: "Expired",
    rejected: "Rejected",
    certTitle: "Media Broadcasting License",
    certBody: "Media Outlet",
    issuedBy: "Issued by: Ministry of Information",
    validUntil: "Valid Until",
    scanVerify: "Scan QR to Verify",
    types: { online: "Online", tv: "Television", radio: "Radio", print: "Print" },
    applications: "Recent Applications",
    ministry: "Ministry of Information",
  }
};

const mediaTypes = [
  { id: "online", icon: Monitor },
  { id: "tv", icon: Tv },
  { id: "radio", icon: Radio },
  { id: "print", icon: Newspaper },
];

const statusData = [
  { id: "APP-2024-0892", name: "វិទ្យុជាតិ FM 96", nameEn: "National Radio FM 96", status: "approved", date: "2024-11-15", type: "radio" },
  { id: "APP-2024-1134", name: "ទីស្ដីការព័ត៌មាន", nameEn: "Information Headquarters", status: "pending", date: "2024-12-01", type: "tv" },
  { id: "APP-2024-0756", name: "ភ្នំពេញអនឡាញ", nameEn: "Phnom Penh Online", status: "expired", date: "2024-09-20", type: "online" },
];

const statusColors = {
  approved: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  expired: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  rejected: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", dot: "bg-slate-400" },
};

const QRCodeSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="white"/>
    {[0,1,2,3,4,5,6].map(i => [0,1,2,3,4,5,6].map(j => {
      const border = (i<7&&j<7)||(i<7&&j>92)||( i>92&&j<7);
      return null;
    }))}
    {/* QR pattern simulation */}
    {[[2,2],[2,3],[2,4],[2,5],[2,6],[3,2],[3,6],[4,2],[4,3],[4,4],[4,5],[4,6],[5,2],[5,6],[6,2],[6,3],[6,4],[6,5],[6,6]].map(([r,c],i) => (
      <rect key={`tl${i}`} x={c*7} y={r*7} width="6" height="6" fill="#1e3a5f"/>
    ))}
    {[[2,11],[2,12],[2,14],[3,11],[3,13],[4,12],[4,13],[4,14],[5,11],[5,14],[6,11],[6,12],[6,14],[8,2],[8,4],[8,5],[9,3],[9,6],[10,2],[10,5],[10,6],[11,3],[11,4],[12,2],[12,6],[2,2],[2,3]].map(([r,c],i) => (
      <rect key={`mid${i}`} x={c*7} y={r*7} width="5" height="5" fill="#1e3a5f" opacity="0.7"/>
    ))}
    {[[2,11],[2,12],[2,13],[3,11],[3,13],[4,11],[4,12],[4,13],[5,11],[5,13],[6,11],[6,12],[6,13]].map(([r,c],i) => (
      <rect key={`tr${i}`} x={c*7} y={r*7} width="6" height="6" fill="#1e3a5f"/>
    ))}
    {[[11,2],[11,3],[11,4],[12,2],[12,4],[13,2],[13,3],[13,4]].map(([r,c],i) => (
      <rect key={`bl${i}`} x={c*7} y={r*7} width="6" height="6" fill="#1e3a5f"/>
    ))}
    {[7,8,9,10,11,12].map(i => (
      <rect key={`d${i}`} x={i*7} y={i*7} width="5" height="5" fill="#1e3a5f" opacity="0.5"/>
    ))}
  </svg>
);

export default function App() {
  const [lang, setLang] = useState("kh");
  const [activeTab, setActiveTab] = useState("form");
  const [step, setStep] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];

  const toggleLang = () => setLang(l => l === "kh" ? "en" : "kh");

  const handleUpload = (key) => {
    setUploadedDocs(prev => ({ ...prev, [key]: true }));
  };

  const handleSubmit = () => setSubmitted(true);

  const steps = [0, 1, 2, 3];

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7ff 100%)", fontFamily: "'Khmer OS', 'Noto Sans Khmer', 'Hanuman', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(90deg, #0d2b55 0%, #1a4a8a 60%, #1e3a5f 100%)", boxShadow: "0 4px 24px rgba(13,43,85,0.18)" }}>
        <div className="max-w-6xl mx-auto px-4 py-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: "0.01em" }}>
                  {t.ministry}
                </div>
                <div className="text-blue-200 text-xs opacity-80">
                  {lang === "kh" ? "ព្រះរាជាណាចក្រកម្ពុជា" : "Kingdom of Cambodia"}
                </div>
              </div>
            </div>

            {/* Nav - desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {t.nav.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(["home","form","status","help"][i])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === ["home","form","status","help"][i] ? "bg-white text-blue-900 shadow" : "text-blue-100 hover:bg-white/10"}`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Lang Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.13)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white" }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === "kh" ? "KH" : "EN"}</span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span style={{ opacity: 0.6 }}>{lang === "kh" ? "EN" : "KH"}</span>
              </button>
              <button className="md:hidden text-white p-1" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* System Name Bar */}
          <div className="py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="text-center">
              <h1 className="text-white font-bold text-base md:text-lg leading-tight">{t.systemName}</h1>
              <p className="text-blue-200 text-xs mt-0.5 opacity-70">{t.systemNameSub}</p>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-1">
            {t.nav.map((item, i) => (
              <button key={i} onClick={() => { setActiveTab(["home","form","status","help"][i]); setMobileMenu(false); }}
                className="text-left px-4 py-2 rounded-lg text-sm text-blue-100 hover:bg-white/10 transition">{item}</button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ===== HOME TAB ===== */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(135deg, #0d2b55 0%, #1a4a8a 100%)" }}>
              <div className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide" style={{ background: "rgba(255,255,255,0.12)", color: "#a5c8ff" }}>
                  <Star className="w-3 h-3" />
                  {lang === "kh" ? "ប្រព័ន្ធផ្លូវការ" : "Official System"}
                </div>
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-4 leading-tight">{t.systemName}</h2>
                <p className="text-blue-200 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  {lang === "kh" ? "ស្នើសុំ ពិនិត្យ និងគ្រប់គ្រងអាជ្ញាបណ្ណសារព័ត៌មានរបស់អ្នកតាមរបៀបឌីជីថល" : "Apply, track, and manage your media broadcasting licenses digitally"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => setActiveTab("form")} className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg" style={{ background: "white", color: "#0d2b55" }}>
                    {lang === "kh" ? "ស្នើសុំអាជ្ញាបណ្ណ" : "Apply for License"}
                  </button>
                  <button onClick={() => setActiveTab("status")} className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                    {lang === "kh" ? "ពិនិត្យស្ថានភាព" : "Check Status"}
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: "1,248", label: lang === "kh" ? "អាជ្ញាបណ្ណសកម្ម" : "Active Licenses" },
                { n: "89", label: lang === "kh" ? "កំពុងពិនិត្យ" : "Under Review" },
                { n: "342", label: lang === "kh" ? "បានអនុម័តឆ្នាំនេះ" : "Approved This Year" },
                { n: "24h", label: lang === "kh" ? "ពេលដំណើរការ" : "Processing Time" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50 text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: "#1a4a8a" }}>{s.n}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== FORM TAB ===== */}
        {activeTab === "form" && (
          <div className="space-y-6">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-10 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0d2b55" }}>
                  {lang === "kh" ? "បានដាក់ស្នើដោយជោគជ័យ!" : "Application Submitted!"}
                </h3>
                <p className="text-slate-500 text-sm mb-2">{lang === "kh" ? "លេខដំណើរការ" : "Application ID"}: <span className="font-bold text-blue-700">APP-2025-1891</span></p>
                <p className="text-slate-400 text-xs mb-6">{lang === "kh" ? "យើងនឹងជូនដំណឹងអ្នកតាមអ៊ីម៉ែលក្នុងរយៈពេល 3-5 ថ្ងៃធ្វើការ" : "You will be notified by email within 3–5 business days"}</p>
                <button onClick={() => { setSubmitted(false); setStep(0); setActiveTab("status"); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#1a4a8a" }}>
                  {lang === "kh" ? "ពិនិត្យស្ថានភាព" : "Track Status"}
                </button>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
                  <div className="flex items-center justify-between">
                    {steps.map((s, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? "text-white shadow-md" : "text-slate-400 bg-slate-100"}`}
                            style={i <= step ? { background: "linear-gradient(135deg, #1a4a8a, #0d2b55)" } : {}}>
                            {i < step ? <Check className="w-4 h-4" /> : i + 1}
                          </div>
                          <span className={`text-xs mt-1.5 text-center w-16 leading-tight ${i === step ? "font-semibold text-blue-800" : "text-slate-400"}`}>
                            {t.stepLabels[i]}
                          </span>
                        </div>
                        {i < 3 && <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${i < step ? "bg-blue-600" : "bg-slate-200"}`} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 0: Media Outlet */}
                {step === 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eef3ff" }}>
                        <Building2 className="w-5 h-5" style={{ color: "#1a4a8a" }} />
                      </div>
                      <h3 className="font-bold text-lg" style={{ color: "#0d2b55" }}>{t.mediaOutlet}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.mediaName}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder={t.mediaNamePh} />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-2">{t.mediaType}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {mediaTypes.map(({ id, icon: Icon }) => (
                            <button key={id} onClick={() => setSelectedType(id)}
                              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${selectedType === id ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>
                              <Icon className={`w-5 h-5 ${selectedType === id ? "text-blue-600" : "text-slate-400"}`} />
                              {t.types[id]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.address}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder={t.addressPh} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.phone}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder="+855 xx xxx xxx" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.email}</label>
                        <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder="example@email.com" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Licensee */}
                {step === 1 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eef3ff" }}>
                        <User className="w-5 h-5" style={{ color: "#1a4a8a" }} />
                      </div>
                      <h3 className="font-bold text-lg" style={{ color: "#0d2b55" }}>{t.licenseeInfo}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.ownerName}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder={t.ownerNamePh} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.idCard}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder={t.idCardPh} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.nationality}</label>
                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-white">
                          <option>{lang === "kh" ? "ខ្មែរ" : "Cambodian"}</option>
                          <option>{lang === "kh" ? "ជាតិផ្សេង" : "Other"}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.position}</label>
                        <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition" placeholder={t.positionPh} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Documents */}
                {step === 2 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eef3ff" }}>
                        <Upload className="w-5 h-5" style={{ color: "#1a4a8a" }} />
                      </div>
                      <h3 className="font-bold text-lg" style={{ color: "#0d2b55" }}>{t.documents}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-6 ml-1">{t.docDesc}</p>
                    <div className="space-y-3">
                      {[
                        { key: "edu", label: t.educationCert, icon: "🎓" },
                        { key: "criminal", label: t.criminalRecord, icon: "📋" },
                        { key: "biz", label: t.businessLicense, icon: "🏢" },
                      ].map(({ key, label, icon }) => (
                        <div key={key} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${uploadedDocs[key] ? "border-emerald-200 bg-emerald-50" : "border-dashed border-slate-200 hover:border-blue-300 bg-slate-50"}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{icon}</span>
                            <div>
                              <p className={`text-sm font-semibold ${uploadedDocs[key] ? "text-emerald-700" : "text-slate-700"}`}>{label}</p>
                              {uploadedDocs[key] && <p className="text-xs text-emerald-500 mt-0.5">✓ {t.uploaded}</p>}
                            </div>
                          </div>
                          <button onClick={() => handleUpload(key)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${uploadedDocs[key] ? "bg-emerald-100 text-emerald-700" : "text-white hover:opacity-90"}`}
                            style={!uploadedDocs[key] ? { background: "#1a4a8a" } : {}}>
                            {uploadedDocs[key] ? <CheckCircle className="w-4 h-4" /> : t.uploadBtn}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eef3ff" }}>
                        <Eye className="w-5 h-5" style={{ color: "#1a4a8a" }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: "#0d2b55" }}>{t.confirm}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{t.confirmDesc}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: t.mediaOutlet, items: [{ k: t.mediaName, v: "—" }, { k: t.mediaType, v: selectedType ? t.types[selectedType] : "—" }] },
                        { label: t.licenseeInfo, items: [{ k: t.ownerName, v: "—" }, { k: t.idCard, v: "—" }] },
                        { label: t.documents, items: [{ k: t.educationCert, v: uploadedDocs.edu ? "✓" : "—" }, { k: t.criminalRecord, v: uploadedDocs.criminal ? "✓" : "—" }, { k: t.businessLicense, v: uploadedDocs.biz ? "✓" : "—" }] },
                      ].map((section, i) => (
                        <div key={i} className="rounded-xl border border-slate-100 overflow-hidden">
                          <div className="px-4 py-2.5 text-xs font-bold tracking-wide uppercase" style={{ background: "#f0f4ff", color: "#1a4a8a" }}>{section.label}</div>
                          <div className="divide-y divide-slate-50">
                            {section.items.map((item, j) => (
                              <div key={j} className="flex justify-between items-center px-4 py-2.5">
                                <span className="text-xs text-slate-500">{item.k}</span>
                                <span className={`text-xs font-semibold ${item.v === "✓" ? "text-emerald-600" : "text-slate-700"}`}>{item.v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 p-4 rounded-xl flex gap-3 items-start" style={{ background: "#fff9e6", border: "1px solid #fde68a" }}>
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 leading-relaxed">
                        {lang === "kh" ? "ដោយការដាក់ស្នើ អ្នកបញ្ជាក់ថាព័ត៌មានទាំងអស់ដែលផ្តល់ជូននេះគឺពិតប្រាកដ។" : "By submitting, you confirm that all information provided is accurate and truthful."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${step === 0 ? "opacity-30 cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                    ← {t.back}
                  </button>
                  {step < 3 ? (
                    <button onClick={() => setStep(s => s + 1)}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md flex items-center gap-2"
                      style={{ background: "linear-gradient(135deg, #1a4a8a, #0d2b55)" }}>
                      {t.next} <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={handleSubmit}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md flex items-center gap-2"
                      style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
                      <CheckCircle className="w-4 h-4" /> {t.submit}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== STATUS TAB ===== */}
        {activeTab === "status" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: "#0d2b55" }}>{t.statusTitle}</h2>

            <div className="space-y-3">
              {statusData.map((app) => {
                const sc = statusColors[app.status];
                return (
                  <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-400">{app.id}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {t[app.status]}
                          </span>
                        </div>
                        <p className="font-bold text-sm" style={{ color: "#0d2b55" }}>{lang === "kh" ? app.name : app.nameEn}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{t.types[app.type]} · {app.date}</p>
                      </div>
                      {app.status === "approved" && (
                        <button onClick={() => setActiveTab("cert")}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition" style={{ background: "#eef3ff", color: "#1a4a8a" }}>
                          <Eye className="w-3.5 h-3.5" />
                          {lang === "kh" ? "មើល" : "View"}
                        </button>
                      )}
                    </div>

                    {/* Timeline */}
                    <div className="mt-4 flex items-center gap-0">
                      {["submitted","reviewing","approved"].map((s, i) => {
                        const done = app.status === "approved" ? true : (app.status === "pending" ? i < 2 : false);
                        const active = app.status === "pending" && i === 1;
                        return (
                          <div key={s} className="flex items-center flex-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${done ? "text-white" : active ? "border-2 border-blue-500 bg-white" : "bg-slate-100 text-slate-400"}`}
                              style={done ? { background: "#059669" } : {}}>
                              {done ? <Check className="w-3 h-3" /> : i + 1}
                            </div>
                            {i < 2 && <div className={`flex-1 h-0.5 ${done && i === 0 ? "bg-emerald-400" : "bg-slate-200"}`} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== CERTIFICATE TAB ===== */}
        {activeTab === "cert" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#0d2b55" }}>{t.certTitle}</h2>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1a4a8a" }}>
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>

            {/* Certificate */}
            <div className="bg-white rounded-2xl shadow-xl border-4 overflow-hidden" style={{ borderColor: "#0d2b55" }}>
              {/* Header strip */}
              <div className="p-5 text-center" style={{ background: "linear-gradient(135deg, #0d2b55 0%, #1a4a8a 100%)" }}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Shield className="w-8 h-8 text-yellow-300" />
                  <div className="text-white">
                    <p className="font-bold text-base">{lang === "kh" ? "ព្រះរាជាណាចក្រកម្ពុជា" : "Kingdom of Cambodia"}</p>
                    <p className="text-blue-200 text-xs">{t.ministry}</p>
                  </div>
                  <Shield className="w-8 h-8 text-yellow-300" />
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Watermark */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <Shield className="w-48 h-48" style={{ color: "#0d2b55" }} />
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-1" style={{ color: "#0d2b55" }}>
                      {lang === "kh" ? "អាជ្ញាបណ្ណ​សារព័ត៌មាន" : "MEDIA BROADCASTING LICENSE"}
                    </h3>
                    <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #0d2b55, #1a4a8a)" }} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      {[
                        { k: lang === "kh" ? "ឈ្មោះស្ថាប័ន" : "Media Outlet", v: "វិទ្យុជាតិ FM 96" },
                        { k: lang === "kh" ? "ប្រភេទ" : "Type", v: lang === "kh" ? "វិទ្យុ" : "Radio Broadcasting" },
                        { k: lang === "kh" ? "លេខអាជ្ញាបណ្ណ" : "License No.", v: "MIC-2024-RA-00892" },
                        { k: lang === "kh" ? "ម្ចាស់" : "Owner", v: "លោក ចាន់ វិសាល" },
                        { k: t.validUntil, v: "15 វិច្ឆិកា 2026" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-xs text-slate-400 w-28 shrink-0 pt-0.5">{item.k}</span>
                          <span className="text-sm font-semibold" style={{ color: "#0d2b55" }}>{item.v}</span>
                        </div>
                      ))}
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-28 h-28 p-2 rounded-xl border-2 shadow-inner" style={{ borderColor: "#e0e8f0" }}>
                        <QRCodeSVG />
                      </div>
                      <p className="text-xs text-slate-400 text-center">{t.scanVerify}</p>
                      <p className="text-xs font-mono text-slate-600">APP-2024-0892</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <p className="font-semibold text-slate-600">{t.issuedBy}</p>
                    <p>{lang === "kh" ? "ចេញកាលបរិច្ឆេទ: ១៥ វិច្ឆិកា ២០២៤" : "Issue Date: November 15, 2024"}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-12 rounded-lg flex items-center justify-center" style={{ background: "#eef3ff" }}>
                      <p className="text-xs text-blue-800 font-bold text-center leading-tight">{lang === "kh" ? "ហត្ថលេខា" : "Signature"}</p>
                    </div>
                  </div>
                </div>

                {/* Approved stamp */}
                <div className="absolute top-8 right-8 opacity-20 rotate-12">
                  <div className="border-4 border-emerald-600 rounded-lg px-3 py-1">
                    <p className="text-emerald-600 font-black text-lg">{lang === "kh" ? "អនុម័ត" : "APPROVED"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-100 shadow-lg">
        <div className="flex">
          {[
            { id: "form", label: lang === "kh" ? "ស្នើសុំ" : "Apply", icon: FileText },
            { id: "status", label: lang === "kh" ? "ស្ថានភាព" : "Status", icon: Clock },
            { id: "cert", label: lang === "kh" ? "អាជ្ញាបណ្ណ" : "License", icon: Shield },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-semibold transition ${activeTab === id ? "text-blue-800" : "text-slate-400"}`}>
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-16 md:h-0" />
    </div>
  );
}
