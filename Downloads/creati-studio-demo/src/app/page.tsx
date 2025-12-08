'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Code, 
  Star, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Users,
  TrendingUp,
  Rocket,
  Layers,
  Cpu,
  Eye,
  Heart,
  Moon,
  Sun,
  Command,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Copy,
  ThumbsUp,
  MessageSquare,
  Globe,
  BarChart3,
  Lock,
  Zap as ZapIcon,
  Brain,
  Wand2,
  Image as ImageIcon,
  FileText,
  Music,
  Video,
  Settings,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronDown,
  MousePointer,
  Keyboard,
  RefreshCw
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stats, setStats] = useState({ users: 0, creations: 0, satisfaction: 0 });
  const [pricingTier, setPricingTier] = useState('professional');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const heroRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      
      const header = document.getElementById('header');
      if (header) {
        if (scrolled > 50) {
          header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'dark:bg-gray-900/90');
          header.classList.remove('bg-transparent');
        } else {
          header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'dark:bg-gray-900/90');
          header.classList.add('bg-transparent');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counter for statistics
  useEffect(() => {
    const targetStats = { users: 127849, creations: 10472836, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        users: Math.floor(targetStats.users * progress),
        creations: Math.floor(targetStats.creations * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress)
      });
      
      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for quick actions
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('prompt-input')?.focus();
      }
      
      // D for dark mode
      if (e.key === 'd' && !(e.target as HTML Element)?.matches('input, textarea')) {
        setIsDarkMode(!isDarkMode);
      }
      
      // Konami code for Easter egg
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
          e.key === 'b' || e.key === 'a') {
        // Easter egg logic here
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDarkMode]);

  // Particle animation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, color: string}> = [];
    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + '40';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const responses = [
        `✨ Generated "${userPrompt}" with advanced AI technology! Here's your stunning result: [AI-generated content would appear here with beautiful formatting]`,
        `🎨 Your creative vision for "${userPrompt}" has been transformed into something extraordinary! [Beautiful AI output]`,
        `🚀 Magic complete! "${userPrompt}" is now a reality. Check out this amazing creation: [Professional AI result]`
      ];
      
      setGeneratedContent(responses[Math.floor(Math.random() * responses.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Neural AI Engine",
      description: "Advanced neural networks understand context, style, and intent to create truly remarkable content.",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      demo: "Processes 10M+ parameters per request"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Magic Wand Tool",
      description: "One-click transformations that turn ordinary ideas into extraordinary creations instantly.",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      demo: "1000+ styles and effects"
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Visual Intelligence",
      description: "AI that sees and understands images like never before with unprecedented accuracy.",
      gradient: "from-green-600 via-emerald-600 to-cyan-600",
      demo: "99.7% recognition accuracy"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Content Mastery",
      description: "Generate compelling narratives, marketing copy, and technical documentation effortlessly.",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      demo: "50+ content templates"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Audio Creation",
      description: "Compose original music, generate voiceovers, and create immersive soundscapes.",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      demo: "Unlimited audio generation"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Production",
      description: "Produce professional videos with AI-powered editing, effects, and animation.",
      gradient: "from-yellow-600 via-orange-600 to-red-600",
      demo: "4K video rendering"
    }
  ];

  const pricingPlans = {
    starter: { monthly: 29, yearly: 290, savings: 17 },
    professional: { monthly: 79, yearly: 790, savings: 17 },
    enterprise: { monthly: 199, yearly: 1990, savings: 17 }
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director at Pixel Perfect",
      content: "This isn't just a tool, it's a creative revolution. We've reduced our production time by 90% while increasing quality tenfold. The AI understands our brand voice perfectly.",
      avatar: "SC",
      rating: 5,
      company: "Pixel Perfect",
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO at InnovateLabs",
      content: "We've scaled our content creation from 10 pieces per month to 1000+ without hiring additional staff. The ROI is absolutely insane. This platform pays for itself daily.",
      avatar: "MR",
      rating: 5,
      company: "InnovateLabs",
      verified: true
    },
    {
      name: "Emily Watson",
      role: "Head of Product at TechCorp",
      content: "The AI's ability to understand complex technical requirements and generate accurate documentation has transformed our development workflow. It's like having a team of expert writers 24/7.",
      avatar: "EW",
      rating: 5,
      company: "TechCorp",
      verified: true
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'}`}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${mousePosition.x - 12}px`,
          top: `${mousePosition.y - 12}px`,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Navigation */}
      <header 
        id="header" 
        className="fixed top-0 w-full z-40 bg-transparent transition-all duration-300"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg animate-pulse" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creati.studio
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Features</a>
              <a href="#playground" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Playground</a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Pricing</a>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <Button variant="ghost" className="font-medium">Sign In</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium">
                Get Started Free
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Features</a>
              <a href="#playground" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Playground</a>
              <a href="#testimonials" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Testimonials</a>
              <a href="#pricing" className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Pricing</a>
              <div className="flex space-x-4">
                <Button variant="ghost" className="flex-1 font-medium">Sign In</Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 opacity-50" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-6 py-2 text-sm font-semibold">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced Neural Networks
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Create the
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient">
                Impossible
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your creative vision into reality with our revolutionary AI platform. 
              Generate stunning visuals, compelling content, and intelligent solutions in seconds, not hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold group">
                Start Creating Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Live Statistics */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {(stats.creations / 1000000).toFixed(1)}M+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Creations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.satisfaction}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <Keyboard className="inline w-4 h-4 mr-2" />
              Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">⌘K</kbd> to quick generate • 
              Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">D</kbd> for dark mode
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Playground */}
      <section id="playground" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Try the Magic Yourself
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the power of AI creation with our interactive playground
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="create" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create
                    </TabsTrigger>
                    <TabsTrigger value="design" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                      <Palette className="w-4 h-4 mr-2" />
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="code" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="analyze" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze
                    </TabsTrigger>
                  </TabsList>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        What would you like to create?
                      </label>
                      <div className="flex gap-4">
                        <Input
                          id="prompt-input"
                          value={userPrompt}
                          onChange={(e) => setUserPrompt(e.target.value)}
                          placeholder="Describe your vision... (e.g., 'A futuristic cityscape at sunset')"
                          className="flex-1 px-4 py-3 text-lg"
                          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                        />
                        <Button 
                          onClick={handleGenerate}
                          disabled={isGenerating || !userPrompt.trim()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Generate
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {generatedContent && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Result</h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {generatedContent}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: <ImageIcon />, label: "Images", count: "10K+" },
                        { icon: <FileText />, label: "Articles", count: "5K+" },
                        { icon: <Code />, label: "Code Snippets", count: "15K+" },
                        { icon: <Music />, label: "Audio Tracks", count: "2K+" }
                      ].map((item, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                            {item.icon}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.count} created</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cutting-edge AI capabilities that push the boundaries of creativity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group ${
                  activeFeature === index ? 'ring-2 ring-purple-600' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {feature.demo}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how top companies are transforming their creative process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    {testimonial.verified && (
                      <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section id="pricing" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your creative journey
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-purple-600' : 'text-gray-500'}`}>Monthly</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
                <span className="relative z-10 text-white text-xs px-2">Save 17%</span>
              </Button>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-purple-600' : 'text-gray-500'}`}>Yearly</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries({
              starter: { name: 'Starter', description: 'Perfect for individuals and hobbyists' },
              professional: { name: 'Professional', description: 'For professionals and growing teams' },
              enterprise: { name: 'Enterprise', description: 'Tailored solutions for large organizations' }
            }).map(([key, plan]) => {
              const pricing = pricingPlans[key as keyof typeof pricingPlans];
              const price = billingCycle === 'monthly' ? pricing.monthly : pricing.yearly;
              const isPopular = key === 'professional';
              
              return (
                <Card 
                  key={key} 
                  className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    isPopular ? 'ring-2 ring-purple-600 ring-offset-4' : ''
                  } bg-white dark:bg-gray-800`}
                >
                  <CardContent className="p-8">
                    {isPopular && (
                      <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 mx-auto block w-fit">
                        Most Popular
                      </Badge>
                    )}
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">${price}</span>
                      <span className="text-gray-500 dark:text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                          Save ${pricing.monthly * 12 - pricing.yearly}/year
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {[
                        key === 'starter' ? '100 AI generations per month' : 
                        key === 'professional' ? 'Unlimited AI generations' : 
                        'Everything in Professional',
                        key === 'starter' ? 'Basic templates' : 'Premium templates & assets',
                        key === 'starter' ? 'Community support' : key === 'professional' ? 'Priority support' : 'Dedicated account manager',
                        key === 'enterprise' ? 'Custom AI model training' : key === 'professional' ? 'Advanced export options' : 'Standard export formats',
                        key === 'enterprise' ? 'SSO & advanced security' : key === 'professional' ? 'Custom brand kit' : '',
                        key === 'enterprise' ? 'White-label options' : key === 'professional' ? 'API access' : ''
                      ].filter(Boolean).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-4 text-lg font-semibold ${
                        isPopular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                          : 'border-2 border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400'
                      }`}
                      variant={isPopular ? "default" : "outline"}
                    >
                      {key === 'enterprise' ? 'Contact Sales' : billingCycle === 'monthly' ? 'Start Free Trial' : 'Get Started'}
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Revolutionize Your Creative Process?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to bring their ideas to life faster than ever before
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Start Your Free Trial
              <Rocket className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg font-semibold">
              Schedule Personal Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              <span>Global CDN</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <ZapIcon className="w-5 h-5 mr-2" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Creati.studio</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The world's most advanced AI-powered creative platform. Transform your ideas into reality with cutting-edge neural networks.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Playground</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API & Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Creati.studio. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">GDPR</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md">
            <h3 className="text-2xl font-bold mb-4">🎉 You found the Easter egg!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You're clearly someone who pays attention to detail. We'd love to work with you!
            </p>
            <Button onClick={() => setShowEasterEgg(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}