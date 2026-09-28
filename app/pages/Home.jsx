'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  TrendingUp,
  Building2,
  Check,
  ArrowRight,
  ShieldCheck,
  Lock,
  Scale,
  Map as MapIcon,
  Apple,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Fonts (set up once in app/layout.js — snippet is in the chat reply)       */
/* -------------------------------------------------------------------------- */
const FONT_BN =
  "var(--font-bengali), 'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif"
const FONT_LOGO = "var(--font-logo), 'Fraunces', Georgia, serif"

/* -------------------------------------------------------------------------- */
/*  Hero image — put your photo at /public/images/hero-woman.jpg               */
/*  (smiling woman in orange top with coin stacks). Falls back to an           */
/*  illustration automatically if the file is missing.                         */
/* -------------------------------------------------------------------------- */
const HERO_IMAGE = '/images/hero-woman.jpg'

// The marketing homepage must hand users off to the CURRENT Shadamon
// investment dashboard. Keep this separate from the legacy donor frontend.
const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ||
  'https://currentshadamon.vercel.app/dashboard'

/* -------------------------------------------------------------------------- */
/*  Copy (Bangla is default, English toggle via the top-right language button) */
/* -------------------------------------------------------------------------- */
const COPY = {
  bn: {
    lang: 'বাংলা',
    login: 'লগইন',
    tagline: 'বিনিয়োগের সহজ প্ল্যাটফর্ম',
    h1a: 'বিনিয়োগ নিয়ে বা দিয়ে,',
    h1b: 'লাভের পথে এগিয়ে যান',
    sub1: 'আপনি যা খুঁজছেন, তা পোস্ট করুন —',
    sub2: 'সুযোগ আসুক আপনার কাছে',
    invest: 'বিনিয়োগ করতে চাই',
    need: 'ব্যবসার জন্য টাকা দরকার',
    free: 'সম্পূর্ণ ফ্রি পোস্ট করুন',
    seeking: 'অন্যরা যেভাবে খুঁজছেন..',
    seeAll: 'সব দেখুন',
    tagEntrepreneur: 'উদ্যোক্তা',
    tagInvestor: 'বিনিয়োগকারী',
    cards: [
      { kind: 'e', title: '৫০ লাখ টাকা প্রয়োজন', meta: 'ঢাকা · খাদ্য ব্যবসা', ret: '২৭% রিটার্ন অফার' },
      { kind: 'i', title: '১-২ কোটি বিনিয়োগ করতে চাই', meta: 'চট্টগ্রাম · টেক/এগ্রো', ret: '২৫%+ রিটার্ন চান' },
      { kind: 'e', title: '২০ লাখ টাকা প্রয়োজন', meta: 'সিলেট · কৃষি প্রকল্প', ret: '২০% রিটার্ন অফার' },
      { kind: 'i', title: '৭৮ লাখ - ১ কোটি বিনিয়োগ করতে চাই', meta: 'ঢাকা · রিয়েল এস্টেট', ret: '২২%+ রিটার্ন চান' },
    ],
    appLead: 'মোবাইল বা কম্পিউটারে শাদামন এপস',
    appTitle: 'ইনস্টল করুন',
    appDesc:
      'কানেকশন রিকোয়েস্ট, মেসেজ এবং অনুমোদনের তাৎক্ষণিক নোটিফিকেশন পান — সরাসরি আপনার হোম স্ক্রিন থেকে। কোনো অ্যাপ স্টোরের প্রয়োজন নেই, ডাউনলোডের সাইজও নেই।',
    appBtn: 'অ্যাপ ইনস্টল করুন',
    appDone: 'অ্যাপ ইনস্টল হয়েছে',
    appHint:
      'আপনার ব্রাউজারের অ্যাড্রেস বারে ইনস্টল আইকন খুঁজুন, অথবা ব্রাউজার মেনু খুলে "Install app" বেছে নিন।',
    whyTitle: 'কেন এখানে বিনিয়োগ বা রিটার্ন খুঁজবেন?',
    features: ['যাচাইকৃত পোস্ট', 'গোপনীয়তা সুরক্ষিত', 'স্বচ্ছ মূল্যায়ন', 'সারাদেশ কভারেজ'],
    footDesc: 'বিনিয়োগকারী ও উদ্যোক্তাদের জন্য বাংলাদেশের সবচেয়ে সহজ প্ল্যাটফর্ম',
    copyright: '© ২০২৬ শাদামন। সর্বস্বত্ব সংরক্ষিত।',
    cols: [
      {
        h: 'পরিচিতি',
        links: [
          { label: 'আমাদের সম্পর্কে', href: 'https://shadamon.com/info/about-us' },
          { label: 'যোগাযোগ করুন', href: 'https://shadamon.com/info/contact-us' },
        ],
      },
      {
        h: 'নিরাপত্তা নীতিমালা',
        links: [
          { label: 'শর্তাবলী', href: 'https://shadamon.com/info/terms-and-conditions' },
          { label: 'প্রাইভেসি পলিসি', href: 'https://shadamon.com/info/privacy-policy' },
          { label: 'সেফটি টিপস', href: 'https://shadamon.com/info/safety-tips' },
        ],
      },
      { h: 'অ্যাপ', links: ['অ্যান্ড্রয়েড অ্যাপ', 'আইওএস অ্যাপ'] },
    ],
  },
  en: {
    lang: 'English',
    login: 'Log in',
    tagline: 'The easy investment platform',
    h1a: 'Invest or raise funds,',
    h1b: 'and move toward profit',
    sub1: 'Post what you are looking for —',
    sub2: 'let opportunities come to you',
    invest: 'I want to invest',
    need: 'I need money for my business',
    free: 'Post completely free',
    seeking: 'What others are looking for..',
    seeAll: 'See all',
    tagEntrepreneur: 'Entrepreneur',
    tagInvestor: 'Investor',
    cards: [
      { kind: 'e', title: 'Needs ৳50 lakh', meta: 'Dhaka · Food business', ret: 'Offering 27% return' },
      { kind: 'i', title: 'Wants to invest ৳1–2 crore', meta: 'Chattogram · Tech/Agro', ret: 'Seeking 25%+ return' },
      { kind: 'e', title: 'Needs ৳20 lakh', meta: 'Sylhet · Agri project', ret: 'Offering 20% return' },
      { kind: 'i', title: 'Wants to invest ৳78 lakh – 1 crore', meta: 'Dhaka · Real estate', ret: 'Seeking 22%+ return' },
    ],
    appLead: 'Shadamon app on mobile or computer',
    appTitle: 'Install now',
    appDesc:
      'Get instant notifications for connection requests, messages and approvals — right from your home screen. No app store needed, and no heavy download.',
    appBtn: 'Install app',
    appDone: 'App installed',
    appHint:
      'Look for the install icon in your browser address bar, or open the browser menu and choose "Install app".',
    whyTitle: 'Why look for investment or returns here?',
    features: ['Verified posts', 'Confidential & secure', 'Transparent valuation', 'Nationwide coverage'],
    footDesc: "Bangladesh's easiest platform for investors and entrepreneurs",
    copyright: '© 2026 Shadamon. All rights reserved.',
    cols: [
      {
        h: 'About',
        links: [
          { label: 'About us', href: 'https://shadamon.com/info/about-us' },
          { label: 'Contact us', href: 'https://shadamon.com/info/contact-us' },
        ],
      },
      {
        h: 'Safety policy',
        links: [
          { label: 'Terms', href: 'https://shadamon.com/info/terms-and-conditions' },
          { label: 'Privacy policy', href: 'https://shadamon.com/info/privacy-policy' },
          { label: 'Safety tips', href: 'https://shadamon.com/info/safety-tips' },
        ],
      },
      { h: 'App', links: ['Android app', 'iOS app'] },
    ],
  },
}

const FEATURE_ICONS = [ShieldCheck, Lock, Scale, MapIcon]

/* -------------------------------------------------------------------------- */
/*  Motion presets                                                            */
/* -------------------------------------------------------------------------- */
const EASE = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.12 + i * 0.1, ease: EASE },
  }),
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const cardIn = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */
const Logo = ({ className = '' }) => (
  <span
    className={`select-none leading-none tracking-tight ${className}`}
    style={{ fontFamily: FONT_LOGO, fontWeight: 600 }}
  >
    shadamon
  </span>
)

const BrandMark = ({ className = '' }) => (
  <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
    <circle cx="17" cy="10" r="6" fill="#6d4fd6" />
    <path d="M4 31c0-7.5 5.5-12.5 13-12.5S30 23.500 30 31v1.500H4z" fill="#6d4fd6" />
    <circle cx="34" cy="13" r="5" fill="#f59e42" />
    <path d="M22 33c0-6.500 4.500-10.500 12-10.500S46 26.500 46 33z" fill="#f59e42" />
  </svg>
)

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
    <polygon points="3.600,2.400 13.300,12 3.600,21.600" fill="#2196f3" />
    <polygon points="3.600,2.400 16.600,8.700 13.300,12" fill="#34a853" />
    <polygon points="16.600,8.700 20.600,10.900 20.600,13.100 16.600,15.300 13.300,12" fill="#fbbc04" />
    <polygon points="3.600,21.600 13.300,12 16.600,15.300" fill="#ea4335" />
  </svg>
)

/* Fallback illustration if the hero photo is missing */
const HeroFallback = () => (
  <div className="absolute inset-0 flex items-end justify-center bg-[radial-gradient(ellipse_at_60%_30%,#c98a5a_0%,#7a4a33_45%,#2a1d1a_100%)]">
    <svg viewBox="0 0 400 300" className="h-[70%] w-[90%]" aria-hidden="true">
      <circle cx="200" cy="90" r="46" fill="#e0a37e" />
      <path d="M150 90c0-40 30-60 60-55 30 3 45 30 40 55-10-20-30-30-50-28-25 2-40 12-50 28z" fill="#2b1a14" />
      <path d="M120 250c0-55 35-95 80-95s80 40 80 95z" fill="#d9642b" />
      <rect x="285" y="175" width="65" height="14" rx="7" fill="#e6bd4f" />
      <rect x="292" y="160" width="58" height="14" rx="7" fill="#f1ce61" />
      <rect x="300" y="145" width="50" height="14" rx="7" fill="#e6bd4f" />
      <rect x="306" y="130" width="44" height="14" rx="7" fill="#f1ce61" />
      <circle cx="328" cy="137" r="5" fill="#fff1a8" />
    </svg>
  </div>
)

export default function Home() {
  const reduce = useReducedMotion()
  const [lang, setLang] = useState('bn')
  const [scrolled, setScrolled] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [flashHint, setFlashHint] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  const t = COPY[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (installed) return
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setDeferredPrompt(null)
      return
    }
    // Browser did not offer a prompt: draw attention to the manual steps
    setFlashHint(true)
    setTimeout(() => setFlashHint(false), 1800)
  }

  const toggleLang = () => setLang((l) => (l === 'bn' ? 'en' : 'bn'))

  return (
    <main
      className="min-h-screen bg-[#f3f3fa] text-[#15151f] antialiased"
      style={{ fontFamily: FONT_BN }}
    >
      {/* ------------------------------ HEADER ------------------------------ */}
      <motion.header
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`sticky top-0 z-50 bg-black transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_6px_24px_rgba(0,0,0,0.45)]' : ''
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Shadamon home">
            <Logo className="text-[26px] text-white" />
          </Link>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLang}
              className="rounded px-1 text-[13px] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b7ae6]"
              aria-label="Change language"
            >
              {t.lang}
            </button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/login"
                className="inline-flex h-[30px] items-center rounded-md bg-[#136b50] px-5 text-[13px] font-medium text-white transition-colors hover:bg-[#178360] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b7ae6]"
              >
                {t.login}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden bg-[#0a0a12]">
        {/* purple glow, bottom-left */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_105%,rgba(78,62,150,0.65)_0%,rgba(40,32,88,0.35)_38%,transparent_70%)]" />

        {/* photo, right side, faded into the dark on its left edge */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute inset-y-0 right-0 w-full opacity-45 sm:w-[62%] sm:opacity-100 lg:w-[56%]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 22%, #000 48%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 22%, #000 48%)',
          }}
        >
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_IMAGE}
              alt=""
              onError={() => setImgOk(false)}
              className="h-full w-full object-cover object-[60%_center]"
            />
          ) : (
            <HeroFallback />
          )}
        </motion.div>

        {/* bottom fade so the photo melts into the section edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a12]/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-[72px] sm:pt-14">
          <div className="max-w-[560px]">
            <motion.p
              variants={rise}
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0}
              className="text-[15px] font-medium text-[#b7abf3]"
            >
              {t.tagline}
            </motion.p>

            <motion.h1
              variants={rise}
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={1}
              className="mt-3 font-bold leading-[1.25] text-white"
            >
              <span className="block text-[28px] sm:text-[36px]">{t.h1a}</span>
              <span className="block text-[34px] font-extrabold sm:text-[48px]">
                {t.h1b}
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={2}
              className="mt-5 text-[15px] leading-[1.55] text-white/90 sm:text-[16px]"
            >
              {t.sub1}
              <br />
              <span className="text-white/75">{t.sub2}</span>
            </motion.p>

            <motion.div
              variants={rise}
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={3}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="sm:w-[212px]">
                <Link
                  href={`${DASHBOARD_URL}?cat=investor`}
                  className="group flex min-h-[62px] w-full items-center gap-3 rounded-xl bg-white px-4 shadow-[0_8px_28px_rgba(255,255,255,0.10)] transition-shadow hover:shadow-[0_12px_34px_rgba(140,120,255,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7abf3]"
                >
                  <TrendingUp
                    size={18}
                    strokeWidth={2.4}
                    className="shrink-0 text-[#6a4fc8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="text-[16px] font-semibold leading-[1.25] text-[#12121a]">
                    {t.invest}
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="sm:w-[212px]">
                <Link
                  href={`${DASHBOARD_URL}?cat=business_owner`}
                  className="group flex min-h-[62px] w-full items-center gap-3 rounded-xl border border-[#6f5bd8] bg-[#136b50] px-4 transition-shadow hover:shadow-[0_12px_34px_rgba(19,107,80,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7abf3]"
                >
                  <Building2
                    size={18}
                    strokeWidth={2.2}
                    className="shrink-0 text-white transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-[15px] font-semibold leading-[1.3] text-white">
                    {t.need}
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              variants={rise}
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={4}
              className="mt-4 flex items-center gap-1.5 text-[13px] text-white/70"
            >
              <Check size={13} strokeWidth={3} className="text-[#3fbf8f]" />
              {t.free}
            </motion.p>
          </div>
        </div>
      </section>

      {/* --------------------------- WHAT OTHERS SEEK ----------------------- */}
      <section className="bg-[#f3f3fa]">
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center justify-between"
          >
            <h2 className="text-[17px] font-bold text-[#15151f]">{t.seeking}</h2>
            <Link
              href="/posts"
              className="group inline-flex items-center gap-1 text-[13px] font-medium text-[#5b43c2] hover:text-[#4630a8]"
            >
              {t.seeAll}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.cards.map((c, i) => {
              const isE = c.kind === 'e'
              return (
                <motion.article
                  key={i}
                  variants={cardIn}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="cursor-pointer rounded-2xl border border-[#e6e4f3] bg-white p-4 shadow-[0_1px_0_rgba(20,20,60,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-[#cfc6f5] hover:shadow-[0_14px_32px_rgba(80,60,180,0.12)]"
                >
                  <span
                    className={`inline-block rounded-full px-2.5 py-[3px] text-[11px] font-medium ${
                      isE ? 'bg-[#ece6fb] text-[#6a4fc8]' : 'bg-[#dcf2e6] text-[#1c7a50]'
                    }`}
                  >
                    {isE ? t.tagEntrepreneur : t.tagInvestor}
                  </span>
                  <h3 className="mt-2.5 min-h-[40px] text-[14.5px] font-bold leading-[1.3] text-[#12121a]">
                    {c.title}
                  </h3>
                  <p className="mt-2 border-t border-dotted border-[#d9d7ea] pt-2 text-[12px] text-[#8a8a9c]">
                    {c.meta}
                  </p>
                  <p className="mt-2 text-[13px] font-medium text-[#3a3a4d]">{c.ret}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------- INSTALL THE APP ----------------------- */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="text-[16px] font-medium text-[#22222e]">{t.appLead}</p>
            <h2 className="text-[22px] font-extrabold leading-tight text-[#12121a]">
              {t.appTitle}
            </h2>
            <p className="mt-2.5 max-w-[400px] text-[12.5px] leading-[1.7] text-[#6b6b7b]">
              {t.appDesc}
            </p>

            <motion.button
              type="button"
              onClick={handleInstall}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={installed}
              className="mt-5 inline-flex h-[42px] min-w-[162px] items-center justify-center gap-2 rounded-md bg-[#136b50] px-6 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_rgba(19,107,80,0.25)] transition-colors hover:bg-[#178360] disabled:cursor-default disabled:bg-[#3c8f74] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#136b50]"
            >
              {installed && <Check size={15} strokeWidth={3} />}
              {installed ? t.appDone : t.appBtn}
            </motion.button>

            <p
              className={`mt-3 max-w-[420px] text-[11.5px] leading-[1.6] text-[#77778a] transition-opacity duration-300 ${
                flashHint ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {t.appHint}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-[270px] rounded-[28px] border border-[#dddbea] bg-[#f7f6fc] p-3 shadow-[0_18px_45px_rgba(60,50,130,0.14)]">
              <div className="h-[350px] rounded-[20px] bg-[#111118] p-4 text-white">
                <div className="flex items-center gap-2">
                  <BrandMark className="h-7 w-7" />
                  <div>
                    <p className="text-[10px] font-medium text-white/60">Shadamon</p>
                    <p className="text-[14px] font-bold">{lang === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="rounded-xl bg-white/8 p-3">
                      <div className="h-2 w-24 rounded bg-white/20" />
                      <div className="mt-2 h-2 w-40 rounded bg-white/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------- WHY -------------------------------- */}
      <section className="bg-[#f3f3fa]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center text-[22px] font-extrabold text-[#12121a]"
          >
            {t.whyTitle}
          </motion.h2>

          <motion.div
            variants={stagger}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {t.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <motion.div
                  key={f}
                  variants={cardIn}
                  className="rounded-xl border border-[#e5e3f0] bg-white px-3 py-4 text-center"
                >
                  <Icon className="mx-auto h-5 w-5 text-[#6a4fc8]" strokeWidth={2} />
                  <p className="mt-2 text-[12px] font-semibold text-[#30303d]">{f}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------ FOOTER ------------------------------ */}
      <footer className="bg-[#0a0a12] text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <BrandMark className="h-8 w-8" />
                <Logo className="text-[24px]" />
              </div>
              <p className="mt-3 max-w-[300px] text-[12px] leading-[1.7] text-white/55">
                {t.footDesc}
              </p>
            </div>

            {t.cols.map((col) => (
              <div key={col.h}>
                <p className="text-[12px] font-semibold text-white/80">{col.h}</p>
                <div className="mt-3 space-y-2">
                  {col.links.map((link) => {
                    const label = typeof link === 'string' ? link : link.label
                    const href = typeof link === 'string' ? '#' : link.href
                    return (
                      <a
                        key={label}
                        href={href}
                        className="block text-[11.5px] text-white/50 transition-colors hover:text-white"
                      >
                        {label}
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-[11px] text-white/35">
            {t.copyright}
          </div>
        </div>
      </footer>
    </main>
  )
}
