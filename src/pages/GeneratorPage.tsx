import { useState, useEffect } from 'react';
import React from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'motion/react';
import { Loader2, Send, Download, Copy, RefreshCw, Sparkles } from 'lucide-react';

export default function GeneratorPage() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('aura_proposal_data');
    return saved ? JSON.parse(saved) : {
      clientName: '',
      projectName: '',
      services: '',
      price: '',
      timeline: '',
      notes: '',
    };
  });

  const [generatedContent, setGeneratedContent] = useState<{
    intro: string;
    closing: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('aura_proposal_data', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const generateProposal = async () => {
    if (!process.env.GEMINI_API_KEY) {
      setError('API ключ Gemini отсутствует. Пожалуйста, настройте его в .env');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Ты эксперт по продажам и копирайтингу. Создай убедительное введение и заключение для коммерческого предложения на основе следующих данных:
        
        Клиент: ${formData.clientName}
        Проект: ${formData.projectName}
        Услуги: ${formData.services}
        Цена: ${formData.price}
        Сроки: ${formData.timeline}
        Заметки: ${formData.notes}

        Верни ответ в формате JSON с двумя ключами: "intro" и "closing".
        "intro" должно быть вовлекающим, профессиональным и подчеркивать ценность предложения.
        "closing" должно быть сильным призывом к действию.
        Текст должен быть на русском языке.
        Не используй markdown форматирование в значениях JSON.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text;
      if (text) {
        const json = JSON.parse(text);
        setGeneratedContent(json);
      }
    } catch (err) {
      console.error('Error generating proposal:', err);
      setError('Не удалось создать предложение. Пожалуйста, попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 h-fit"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/logo.png"
                alt="AURA Logo"
                className="w-10 h-10 rounded-lg"
              />
              <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">Создать КП</h1>
            </div>
            <p className="text-slate-500">Заполните детали, чтобы создать выигрышное предложение.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Имя клиента</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="ООО Ромашка"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Название проекта</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="Редизайн сайта"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Услуги (через запятую)</label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 h-24 resize-none text-slate-900"
                placeholder="UI/UX Дизайн, Frontend Разработка, SEO Оптимизация..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Цена</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="500 000 ₽"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Сроки</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                  placeholder="4 недели"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Дополнительные заметки</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 h-24 resize-none text-slate-900"
                placeholder="Подчеркнуть скорость и качество..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateProposal}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Творим магию...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Сгенерировать КП
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="sticky top-24">
            <div className="bg-white text-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[600px] flex flex-col border border-slate-200">
              {/* Proposal Header */}
              <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <img
                      src="/logo.png"
                      alt="AURA Logo"
                      className="w-12 h-12 rounded-xl shadow-lg"
                    />
                    <div className="text-right">
                      <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Коммерческое предложение для</p>
                      <h2 className="text-2xl font-bold">{formData.clientName || 'Имя клиента'}</h2>
                    </div>
                  </div>
                  <h1 className="text-4xl font-display font-bold mb-2">{formData.projectName || 'Название проекта'}</h1>
                  <p className="text-slate-400">{new Date().toLocaleDateString('ru-RU')}</p>
                </div>
              </div>

              {/* Proposal Body */}
              <div className="p-8 flex-grow space-y-8">
                {generatedContent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <section>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Резюме проекта</h3>
                      <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">{generatedContent.intro}</p>
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-500 mb-1">Инвестиции</p>
                        <p className="text-2xl font-bold text-slate-900">{formData.price || '0 ₽'}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-500 mb-1">Сроки</p>
                        <p className="text-2xl font-bold text-slate-900">{formData.timeline || 'Не указаны'}</p>
                      </div>
                    </div>

                    <section>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Объем работ</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.services.split(',').map((service, i) => (
                          service.trim() && (
                            <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                              {service.trim()}
                            </span>
                          )
                        ))}
                        {!formData.services && <span className="text-slate-400 italic">Услуги появятся здесь...</span>}
                      </div>
                    </section>

                    <section className="bg-slate-900 text-white p-6 rounded-2xl">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Следующие шаги</h3>
                      <p className="text-slate-300 mb-4 whitespace-pre-wrap">{generatedContent.closing}</p>
                      <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                        Принять предложение
                      </button>
                    </section>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 min-h-[300px]">
                    <RefreshCw className="w-12 h-12 opacity-20" />
                    <p>Заполните форму и нажмите кнопку генерации.</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" />
                  Копировать ссылку
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
