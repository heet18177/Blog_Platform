import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Users,
  Globe,
  Zap,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Reimagining Tech Journalism
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Knowledge for the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Modern Developer
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            ArticleX is your premier destination for deep dives into web
            architecture, cutting-edge frameworks, and software craftsmanship.
            We strip away the noise to bring you actionable insights.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/20"
              onClick={() => navigate("/blog")}
            >
              Start Reading <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-full border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              Our Philosophy
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              10k+
            </h3>
            <p className="text-slate-500 uppercase tracking-wider text-sm font-semibold">
              Monthly Readers
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              500+
            </h3>
            <p className="text-slate-500 uppercase tracking-wider text-sm font-semibold">
              Articles Published
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              50+
            </h3>
            <p className="text-slate-500 uppercase tracking-wider text-sm font-semibold">
              Expert Authors
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              100%
            </h3>
            <p className="text-slate-500 uppercase tracking-wider text-sm font-semibold">
              Open Source
            </p>
          </div>
        </div>
      </section>

      {/* Mission Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why we started ArticleX
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                The web is evolving faster than ever. Keeping up with the latest
                frameworks, best practices, and industry standards can be
                overwhelming.
              </p>
              <p>
                We believe in <strong>quality over quantity</strong>. Instead of
                chasing every trend, we focus on fundamental patterns, scalable
                architecture, and technologies that are here to stay.
              </p>
              <p>
                Our mission is to build a community where knowledge is shared
                freely, mentorship is accessible, and developers empower each
                other.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-500 w-6 h-6" />
                <span className="font-medium">Industry Best Practices</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-500 w-6 h-6" />
                <span className="font-medium">Real-world Examples</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-500 w-6 h-6" />
                <span className="font-medium">Curated Content</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-500 w-6 h-6" />
                <span className="font-medium">Community Driven</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-neutral-800 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-slate-500 text-sm">
                Connecting developers from over 100 countries around the world.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-neutral-800 hover:scale-105 transition-transform duration-300 mt-0 md:mt-8">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-slate-500 text-sm">
                Built by developers, for developers. Your growth is our
                priority.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-neutral-800 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Learning</h3>
              <p className="text-slate-500 text-sm">
                Concise, powerful articles that respect your time and attention.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-neutral-800 hover:scale-105 transition-transform duration-300 mt-0 md:mt-8">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Deep Archive</h3>
              <p className="text-slate-500 text-sm">
                Access thousands of tutorials, guides, and reference materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Author Section */}
      <section className="py-20 bg-slate-100 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BadgeCheck className="w-12 h-12 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-12">Meet the Editor</h2>

          <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-8 border border-slate-200 dark:border-neutral-800">
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0">
              <img
                src="/author.avif"
                alt="Heet Mavani"
                className="w-full h-full object-cover rounded-full border-4 border-slate-100 dark:border-neutral-800 shadow-lg"
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">Heet Mavani</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Lead Developer & Editor
              </p>
              <p className="text-slate-600 dark:text-slate-400 italic mb-6">
                "I started ArticleX to create the resource I wish I had when I
                began my journey. A place where clarity meets depth."
              </p>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to level up?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of developers receiving the best tech insights
              directly in their feed. Start writing, reading, and growing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-none font-bold"
              >
                Get Started Now
              </Button>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
