'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Component() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setPrediction(null);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(
          'https://46a5-180-248-22-74.ngrok-free.app/predict',
          {
            method: 'POST',
            headers: {
              'User-Agent': 'my-custom-client',
            },
            body: formData,
          }
        );
        if (!response.ok) throw new Error('Gagal prediksi');
        const data = await response.json();
        if (data.prediction === 'Maaf, gambar tidak dikenali') {
          setPrediction('Maaf, gambar tidak dikenali.');
        } else {
          setPrediction(
            `Prediksi: ${data.prediction}, Akurasi: ${data.confidence}`
          );
        }
      } catch {
        setPrediction('Terjadi kesalahan saat prediksi.');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const titleText = 'Deteksi Ras Kucing';
  const subtitleText =
    'Temukan jenis kucing Anda dengan AI berbasis Teachable Machine. AI model yang dibangun menggunakan Teachable Machine untuk mengidentifikasi ras kucing secara instan dan akurat.';

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden'>
      <div className='absolute top-10 left-10 text-6xl opacity-20 rotate-12'>
        🐾
      </div>
      <div className='absolute top-32 right-20 text-4xl opacity-30 -rotate-12'>
        🐱
      </div>
      <div className='absolute bottom-20 left-20 text-5xl opacity-25 rotate-45'>
        😸
      </div>
      <div className='absolute bottom-32 right-10 text-3xl opacity-20 -rotate-45'>
        🐾
      </div>
      <div className='absolute top-1/2 left-5 text-2xl opacity-15'>🧡</div>
      <div className='absolute top-1/3 right-5 text-2xl opacity-15'>💛</div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-4 py-8 lg:py-16 min-h-screen flex flex-col justify-center'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
          {/* Left Content */}
          <div className='flex-1 text-center lg:text-left max-w-2xl'>
            {/* Animated Title */}
            <div className='mb-6'>
              <motion.h1
                className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'
                style={{
                  background:
                    'linear-gradient(135deg, #f97316, #ea580c, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {titleText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <motion.span
                  className='inline-block ml-4'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: titleText.length * 0.1 + 0.3,
                    duration: 0.5,
                  }}
                >
                  🐱
                </motion.span>
              </motion.h1>
            </div>

            {/* Animated Subtitle */}
            <motion.p
              className='text-lg sm:text-xl md:text-lg mb-8 text-orange-800 leading-relaxed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: titleText.length * 0.1 + 0.8,
                duration: 0.8,
              }}
            >
              {subtitleText}
            </motion.p>

            {/* Features */}
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: titleText.length * 0.1 + 1.2,
                duration: 0.6,
              }}
            ></motion.div>

            {/* Cat Facts */}
            <motion.div
              className='bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 border border-orange-200'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: titleText.length * 0.1 + 1.6,
                duration: 0.6,
              }}
            >
              <div className='flex items-center gap-3 mb-3'>
                <Sparkles className='w-6 h-6 text-orange-600' />
                <h3 className='font-bold text-orange-900'>Tahukah Anda?</h3>
              </div>
              <p className='text-orange-800 text-sm leading-relaxed'>
                Setiap kucing memiliki pola hidung yang unik seperti sidik jari
                manusia! Dengan AI kami, Anda bisa mengetahui ras kucing hanya
                dari foto wajahnya.
              </p>
            </motion.div>
          </div>

          {/* Right Upload Section */}
          <motion.div
            className='flex-shrink-0 w-full max-w-md'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: titleText.length * 0.1 + 0.6, duration: 0.8 }}
          >
            <div className='text-center mb-6'>
              <div className='flex items-center justify-center gap-2 mb-3'>
                <h3 className='text-2xl md:text-3xl font-bold text-orange-900'>
                  Upload Foto Kucing
                </h3>
              </div>
              <p className='text-orange-700'>
                Drag & drop atau klik untuk memilih foto
              </p>
            </div>

            <motion.div
              className={`relative bg-white/80 backdrop-blur-sm border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 shadow-lg ${
                isDragOver
                  ? 'border-orange-400 bg-orange-50/80 scale-105 shadow-xl'
                  : 'border-orange-300 hover:border-orange-400 hover:bg-orange-50/60 hover:shadow-xl'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className='hidden'
              />

              <AnimatePresence mode='wait'>
                {uploadedImage ? (
                  <motion.div
                    key='uploaded'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className='space-y-4'
                  >
                    <img
                      src={uploadedImage || '/placeholder.svg'}
                      alt='Uploaded cat'
                      className='w-full h-48 object-cover rounded-2xl border-4 border-orange-200'
                    />
                    <motion.div
                      className='flex items-center justify-center gap-2 text-orange-800'
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className='w-5 h-5 fill-current text-yellow-500' />
                      <span className='font-medium'>
                        Menganalisis kucing kesayangan Anda...
                      </span>
                      <Star className='w-5 h-5 fill-current text-yellow-500' />
                    </motion.div>
                    {prediction && (
                      <div className='mt-4 text-orange-900 font-semibold text-center'>
                        {prediction}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className='space-y-6'>
                    <motion.div
                      className='mx-auto w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full flex items-center justify-center border-4 border-orange-300'
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Camera className='w-10 h-10 text-orange-700' />
                    </motion.div>

                    <div className='space-y-3'>
                      <p className='text-orange-900 font-semibold text-lg'>
                        Pilih Foto Kucing Terbaik
                      </p>
                      <p className='text-orange-700 text-sm'>
                        Pastikan wajah kucing terlihat jelas untuk hasil terbaik
                      </p>
                      <p className='text-orange-600 text-xs'>
                        Format: JPG, PNG, WEBP • Maksimal 10MB
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size='lg'
                        className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg border-0'
                        onClick={handleClick}
                      >
                        <Upload className='w-5 h-5 mr-2' />
                        Pilih Foto Kucing
                      </Button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Popular Breeds */}
            <motion.div
              className='mt-8 text-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: titleText.length * 0.1 + 1.4,
                duration: 0.6,
              }}
            >
              <p className='text-orange-800 font-medium mb-4 flex items-center justify-center gap-2'>
                <span>🏅</span>
                Ras Kucing Populer yang Dapat Dideteksi
                <span>🏅</span>
              </p>
              <div className='flex flex-wrap justify-center gap-3'>
                {[
                  { name: 'Persian', emoji: '😽' },
                  { name: 'Maine Coon', emoji: '🦁' },
                  { name: 'Siamese', emoji: '😸' },
                  { name: 'British Shorthair', emoji: '😺' },
                  { name: 'Ragdoll', emoji: '😻' },
                  { name: 'Bengal', emoji: '🐅' },
                ].map((breed, index) => (
                  <motion.span
                    key={breed.name}
                    className='bg-gradient-to-r from-white to-orange-50 px-4 py-2 rounded-full text-orange-800 text-sm font-medium border border-orange-200 shadow-sm'
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255, 237, 213, 0.8)',
                      boxShadow: '0 4px 12px rgba(251, 146, 60, 0.3)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: titleText.length * 0.1 + 1.6 + index * 0.1,
                    }}
                  >
                    <span className='mr-2'>{breed.emoji}</span>
                    {breed.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          className='text-center mt-16 lg:mt-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: titleText.length * 0.1 + 2, duration: 0.8 }}
        >
          <div className='flex justify-center items-center gap-2 mt-4'>
            {['🐈', '💕', '🐈‍⬛', '💕', '🐈'].map((emoji, index) => (
              <motion.span
                key={index}
                className='text-2xl'
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
