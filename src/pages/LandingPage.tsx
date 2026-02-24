import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, CheckCircle, ArrowRight, FileText, Settings } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-purple-600 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              КП на базе ИИ
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-slate-900">
              КП, которые закрывают сделки.<br />
              <span className="text-slate-500">
                Пока вы пьете кофе.
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Создавайте профессиональные, убедительные коммерческие предложения за 2 минуты. 
              Превратите сухие данные в закрытые сделки с помощью AURA AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/generator"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Создать КП
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-600 font-medium hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                Как это работает
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">Формула успеха</h2>
            <p className="text-slate-500">От вводных данных до подписанного контракта за три шага.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-slate-200/50 via-purple-200 to-slate-200/50 z-0" />

            {[
              {
                icon: FileText,
                title: "Ввод данных",
                desc: "Введите данные клиента и детали проекта.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: Settings,
                title: "Условия",
                desc: "Укажите цену, сроки и условия.",
                color: "text-pink-600",
                bg: "bg-pink-50",
              },
              {
                icon: Zap,
                title: "Анализ ИИ",
                desc: "AURA мгновенно создает убедительное предложение.",
                color: "text-purple-700",
                bg: "bg-purple-100",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 bg-white/80 backdrop-blur-sm border border-slate-100 p-8 rounded-3xl hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">Простые тарифы</h2>
            <p className="text-slate-500">Выберите план, который подходит вашей команде.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Старт",
                price: "$0",
                features: ["5 КП в месяц", "Базовые шаблоны", "Экспорт в PDF"],
                cta: "Начать",
                highlight: false,
              },
              {
                name: "Про",
                price: "$29",
                features: ["Безлимитные КП", "ИИ-копирайтинг", "Свой брендинг", "Аналитика"],
                cta: "Попробовать бесплатно",
                highlight: true,
              },
              {
                name: "Команда",
                price: "$99",
                features: ["5 участников", "Общая библиотека", "Приоритетная поддержка", "Доступ к API"],
                cta: "Связаться с отделом продаж",
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`relative p-8 rounded-3xl border ${
                  plan.highlight
                    ? 'bg-white/90 backdrop-blur-sm border-purple-200 shadow-2xl shadow-purple-500/10'
                    : 'bg-white/60 backdrop-blur-sm border-slate-200'
                } flex flex-col`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Популярный
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-slate-500 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-400">/мес</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className={`w-5 h-5 ${plan.highlight ? 'text-purple-500' : 'text-slate-400'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
