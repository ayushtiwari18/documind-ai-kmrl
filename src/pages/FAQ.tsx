// src/pages/FAQ.tsx
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  FileText,
  Settings,
  Shield,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "Getting Started",
    question: "How do I upload documents to the system?",
    answer:
      "You can upload documents in multiple ways: 1) Click the 'Upload Document' button on the dashboard or documents page, 2) Drag and drop files directly onto the upload area, 3) Documents are automatically ingested from connected email accounts and SharePoint. Supported formats include PDF, Word, Excel, and image files (JPG, PNG).",
  },
  {
    id: "2",
    category: "Getting Started",
    question: "What document formats are supported?",
    answer:
      "The system supports PDF, Microsoft Word (.doc, .docx), Microsoft Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), and image formats (JPG, PNG, TIFF). The AI can process both English and Malayalam text in any of these formats.",
  },
  {
    id: "3",
    category: "Features",
    question: "How accurate is the AI classification?",
    answer:
      "Our AI classification system achieves 95%+ accuracy for standard document types. The system continuously learns from user feedback and corrections, improving accuracy over time. For KMRL-specific document types, accuracy typically reaches 97-98% after the initial training period.",
  },
  {
    id: "4",
    category: "Features",
    question: "How does bilingual processing work?",
    answer:
      "The system automatically detects English and Malayalam text within documents. It can extract key information from mixed-language documents, provide summaries in your preferred language, and route documents based on content regardless of the language used.",
  },
  {
    id: "5",
    category: "Features",
    question: "Can I customize my dashboard?",
    answer:
      "Yes! You can personalize your dashboard by: choosing which widgets to display, setting your preferred document view (card or list), selecting notification preferences, and choosing your primary language (English/Malayalam/Both). Go to Settings > Profile to customize your dashboard layout.",
  },
  {
    id: "6",
    category: "Technical",
    question: "What are the system requirements?",
    answer:
      "The system works on any modern web browser (Chrome, Firefox, Safari, Edge). Recommended: Chrome 90+ or equivalent, minimum 4GB RAM, stable internet connection (minimum 10 Mbps for optimal performance). No software installation required - it's fully web-based.",
  },
  {
    id: "7",
    category: "Technical",
    question: "How do I report bugs or technical issues?",
    answer:
      "Report issues through: 1) The 'Report Issue' button on any document page, 2) Contact support via the Contact Us page, 3) Call our technical support hotline during business hours. Please include screenshots and describe the steps that led to the issue for faster resolution.",
  },
  {
    id: "8",
    category: "Support",
    question: "What training resources are available?",
    answer:
      "We provide comprehensive training including: video tutorials for each feature, downloadable user manual (PDF), live training sessions for new users, one-on-one support for administrators, and regular webinars for advanced features. Check the Help section or contact support to schedule training.",
  },
  {
    id: "9",
    category: "Support",
    question: "How quickly does the system process documents?",
    answer:
      "Most documents are processed within 30 seconds to 2 minutes, depending on size and complexity. Large documents (>10MB) may take up to 5 minutes. You'll receive a notification when processing is complete, and urgent documents are prioritized automatically.",
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    "all",
    "Getting Started",
    "Features",
    "Technical",
    "Support",
  ];

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Getting Started":
        return <FileText className="w-5 h-5" />;
      case "Features":
        return <HelpCircle className="w-5 h-5" />;
      case "Technical":
        return <Settings className="w-5 h-5" />;
      case "Support":
        return <Shield className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about KMRL's Document Management
            System
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card-enterprise mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="card-enterprise">
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full text-left flex items-center justify-between p-0 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-primary">
                    {getCategoryIcon(faq.category)}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {faq.category}
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                {expandedItems.includes(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {expandedItems.includes(faq.id) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No FAQs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Contact Support Section */}
        <div className="card-enterprise mt-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Still need help?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is ready to
            help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-success">Contact Support</Button>
            <Button variant="outline">Schedule Training</Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Response time: Within 24 hours | Phone support: Monday-Friday, 9 AM
            - 6 PM IST
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
