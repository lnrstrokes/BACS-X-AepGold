import React, { useState } from 'react';
import { CandidateProfileExport } from '../types';
import { copyToClipboard } from '../lib/clipboard';
import { downloadJsonFile } from '../lib/download';
import { formatFriendlyDate } from '../lib/dates';
import { BrandLockup } from './BrandLockup';
import { CONSULTANT_WHATSAPP_RAW } from '../constants';
import {
  Check,
  Copy,
  Download,
  RotateCcw,
  MessageSquare,
  FileCode,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

interface OutputScreenProps {
  profile: CandidateProfileExport;
  onStartOver: () => void;
}

export const OutputScreen: React.FC<OutputScreenProps> = ({ profile, onStartOver }) => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedHandoff, setCopiedHandoff] = useState(false);
  const [copiedWhatsAppMsg, setCopiedWhatsAppMsg] = useState(false);
  const [showJsonRaw, setShowJsonRaw] = useState(true);
  const [showStartOverModal, setShowStartOverModal] = useState(false);

  const formattedJson = JSON.stringify(profile, null, 2);
  const fileName = `candidate-profile-${profile.profile_id}.json`;
  
  const handoffMessage = `Hello, I have completed the BACS × EapGold Travels Canada Immigration Candidate Profile Generator. My profile ID is ${profile.profile_id}. I am attaching the JSON file for the professional assessment.`;

  // Pre-formatted WhatsApp outreach message containing the consultant message + candidate executive summary
  const langScores = profile.language?.first_official?.scores;
  const firstLangTest = profile.language?.first_official?.test_type;
  const firstLangScoresText =
    firstLangTest && firstLangTest !== 'None' && langScores
      ? ` (L:${langScores.listening || '-'} R:${langScores.reading || '-'} W:${langScores.writing || '-'} S:${langScores.speaking || '-'})`
      : '';

  const whatsappMessage = `*Canada Immigration Candidate Profile Intake*
*BACS × EapGold Travels*

Hello, I have completed my Canada Immigration Candidate Profile intake evaluation.

*Candidate Summary:*
• Name: ${profile.contact?.full_name || 'N/A'}
• Profile ID: ${profile.profile_id}
• Email: ${profile.contact?.email || 'N/A'}
• Phone: ${profile.contact?.phone || 'N/A'}
• Location: ${profile.contact?.current_city ? `${profile.contact.current_city}, ` : ''}${profile.contact?.current_country || 'N/A'}

*Key Qualifications:*
• Primary Occupation: ${profile.work_experience?.primary_occupation || 'N/A'}${profile.work_experience?.noc_code_or_teer ? ` (${profile.work_experience.noc_code_or_teer})` : ''}
• Skilled Foreign Work: ${profile.work_experience?.total_years_foreign_experience || 'N/A'}
• Highest Education: ${profile.education?.highest_level || 'N/A'}${profile.education?.has_eca ? ` (ECA: ${profile.education?.eca_organization || 'Verified'})` : ' (No ECA)'}
• First Language Test: ${firstLangTest || 'None'}${firstLangScoresText}
• Settlement Funds (CAD): $${profile.financial_information?.available_settlement_funds_cad ? Number(profile.financial_information.available_settlement_funds_cad).toLocaleString() : '0'} CAD (Family size: ${profile.financial_information?.family_members_count_for_funds || '1'})
• Canadian Experience: ${profile.canadian_experience?.has_canadian_experience ? 'Yes' : 'No'}
• Target Timeline: ${profile.career_preferences?.target_immigration_timeline || 'Standard'}

*Consultant Message:*
"${handoffMessage}"

Generated via BACS × EapGold Travels Profile Generator (Profile ID: ${profile.profile_id})`;

  const whatsappUrl = `https://wa.me/${CONSULTANT_WHATSAPP_RAW}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyJson = async () => {
    const success = await copyToClipboard(formattedJson);
    if (success) {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    }
  };

  const handleCopyHandoff = async () => {
    const success = await copyToClipboard(handoffMessage);
    if (success) {
      setCopiedHandoff(true);
      setTimeout(() => setCopiedHandoff(false), 2500);
    }
  };

  const handleCopyWhatsAppMsg = async () => {
    const success = await copyToClipboard(whatsappMessage);
    if (success) {
      setCopiedWhatsAppMsg(true);
      setTimeout(() => setCopiedWhatsAppMsg(false), 2500);
    }
  };

  const handleDownload = () => {
    downloadJsonFile(fileName, formattedJson);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Success Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <BrandLockup size="sm" />
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <Check className="w-3 h-3" />
                  <span>Profile Generated</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Profile generated
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Your candidate profile has been structured and validated for consultant review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowStartOverModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors self-start sm:self-center shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Start over</span>
          </button>
        </div>

        {/* Profile Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 bg-[#F4F7FB] rounded-xl p-4 border border-slate-200/80">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Candidate Name</span>
            <span className="text-sm font-bold text-slate-900 block truncate mt-0.5">
              {profile.contact.full_name || 'Anonymous Candidate'}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Profile ID</span>
            <span className="text-xs font-mono font-semibold text-[#0B192C] block truncate mt-0.5" title={profile.profile_id}>
              {profile.profile_id}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Generated At</span>
            <span className="text-xs font-semibold text-slate-700 block mt-0.5">
              {formatFriendlyDate(profile.generated_at)}
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3 mt-6">
          {/* Prominent WhatsApp Share Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white text-sm font-bold shadow-sm transition-all duration-150 ring-2 ring-[#25D366]/20 group cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-white fill-white shrink-0 group-hover:scale-110 transition-transform" />
              <span>Send Profile to Consultant via WhatsApp</span>
              <ExternalLink className="w-4 h-4 text-white/80 shrink-0" />
            </a>

            <button
              type="button"
              onClick={handleCopyWhatsAppMsg}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
            >
              {copiedWhatsAppMsg ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy WhatsApp Message</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary File & Handoff Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#152844] active:bg-[#07101E] text-white text-sm font-bold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-[#C59B27]" />
              <span>Download JSON</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJson}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors shadow-2xs"
            >
              {copiedJson ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">JSON Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyHandoff}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors shadow-2xs"
            >
              {copiedHandoff ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Message Copied!</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Copy brief handoff note</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Next Step Callout Box */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
            <Info className="w-4 h-4 text-[#C59B27]" />
            <span>Consultant WhatsApp Outreach</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          Tap the green WhatsApp button above to immediately send your structured evaluation package to the consultant. You can also download or copy the raw JSON file to share via email or other channels.
        </p>

        {/* Handoff message preview */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#C59B27] block">Pre-filled WhatsApp Outreach Message:</span>
            <span className="text-[11px] text-slate-400">Includes candidate details &amp; handoff note</span>
          </div>
          <div className="font-mono text-slate-300 select-all leading-relaxed bg-black/40 p-3 rounded-lg border border-slate-800/80 text-[11px] max-h-48 overflow-y-auto whitespace-pre-wrap">
            {whatsappMessage}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
          This profile intake generator organizes candidate information and does not provide legal or immigration advice or determine eligibility.
        </p>
      </div>

      {/* Structured JSON Output Viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-[#F4F7FB] border-b border-slate-200 cursor-pointer select-none"
          onClick={() => setShowJsonRaw(!showJsonRaw)}
        >
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#0B192C]" />
            <span className="text-sm font-bold text-slate-800">
              Structured JSON Payload ({fileName})
            </span>
          </div>
          <button
            type="button"
            className="text-slate-500 hover:text-slate-700 p-1"
            aria-label="Toggle JSON View"
          >
            {showJsonRaw ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showJsonRaw && (
          <div className="p-4 bg-slate-950 overflow-x-auto max-h-96">
            <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
              {formattedJson}
            </pre>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Resetting */}
      <ConfirmModal
        isOpen={showStartOverModal}
        title="Start over and clear profile?"
        message="This will reset the candidate profile and clear the saved local browser draft. Make sure you have downloaded or copied your JSON first if you need it."
        confirmLabel="Yes, start over"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          setShowStartOverModal(false);
          onStartOver();
        }}
        onCancel={() => setShowStartOverModal(false)}
      />
    </div>
  );
};
