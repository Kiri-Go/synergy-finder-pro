import React, { useState } from 'react';
import { Search, Building2, TrendingUp, Users, Globe, Database, BarChart3, Target, Zap, Filter, Download, Eye, Activity, Percent, Clock, AlertTriangle, CheckCircle, User, Phone, Mail, Calendar, MessageCircle, UserCheck } from 'lucide-react';

// TypeScript interfaces
interface DecisionMaker {
  name: string;
  title: string;
  department: string;
  availability: number;
  engagement: number;
  influence: number;
  lastActivity: string;
  recentSignals: string[];
  contactPreference: string;
  networkConnections: number;
  communicationStyle: string;
}

interface Result {
  id: number;
  company1: string;
  company2: string;
  synergyScore: number;
  opportunity: string;
  industries: string[];
  potentialValue: string;
  predictability: {
    company1Openness: {
      jointVenture: number;
      acquisition: number;
      strategicAlliance: number;
    };
    company2Openness: {
      jointVenture: number;
      acquisition: number;
      strategicAlliance: number;
    };
    overallLikelihood: number;
    indicators: string[];
  };
  decisionMakers: {
    company1: DecisionMaker[];
    company2: DecisionMaker[];
  };
  forecastedOutcomes: {
    jointVenture: {
      revenueGrowth: string;
      marketShare: string;
      costSynergies: string;
      timeToValue: string;
      riskLevel: string;
    };
    acquisition: {
      revenueGrowth: string;
      marketShare: string;
      costSynergies: string;
      timeToValue: string;
      riskLevel: string;
    };
    strategicAlliance: {
      revenueGrowth: string;
      marketShare: string;
      costSynergies: string;
      timeToValue: string;
      riskLevel: string;
    };
  };
  complementarity: {
    company1Strengths: string[];
    company2Strengths: string[];
    gaps: string[];
  };
}

const SynergyFinderApp = () => {
  const [activeTab, setActiveTab] = useState<string>('search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedDealType, setSelectedDealType] = useState<string>('jointVenture');
  const [expandedDecisionMakers, setExpandedDecisionMakers] = useState<{[key: string]: boolean}>({});

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Energy', 'Transportation', 'Real Estate', 'Media', 'Telecom'
  ];

  const metrics = [
    'Revenue Growth', 'Market Share', 'R&D Investment', 'Geographic Presence',
    'Customer Base', 'Supply Chain', 'Technology Stack', 'Brand Value'
  ];

  const mockResults: Result[] = [
    {
      id: 1,
      company1: 'TechFlow Solutions',
      company2: 'DataCore Analytics',
      synergyScore: 92,
      opportunity: 'AI-Powered Data Processing',
      industries: ['Technology', 'Healthcare'],
      potentialValue: '$450M',
      predictability: {
        company1Openness: {
          jointVenture: 78,
          acquisition: 45,
          strategicAlliance: 89
        },
        company2Openness: {
          jointVenture: 82,
          acquisition: 67,
          strategicAlliance: 91
        },
        overallLikelihood: 85,
        indicators: ['Recent partnership announcements', 'Growth capital needs', 'Market expansion signals']
      },
      decisionMakers: {
        company1: [
          {
            name: 'Sarah Chen',
            title: 'CEO & Co-Founder',
            department: 'Executive',
            availability: 72,
            engagement: 89,
            influence: 95,
            lastActivity: '3 days ago',
            recentSignals: ['Spoke at partnership summit', 'Mentioned strategic alliances in Q4 call'],
            contactPreference: 'Direct email',
            networkConnections: 12,
            communicationStyle: 'Strategic, data-driven'
          },
          {
            name: 'Marcus Rodriguez',
            title: 'Chief Strategy Officer',
            department: 'Strategy',
            availability: 85,
            engagement: 94,
            influence: 88,
            lastActivity: '1 day ago',
            recentSignals: ['LinkedIn post about AI partnerships', 'Attended VC partnership event'],
            contactPreference: 'LinkedIn + email',
            networkConnections: 8,
            communicationStyle: 'Collaborative, forward-thinking'
          },
          {
            name: 'Dr. Emily Watson',
            title: 'Chief Technology Officer',
            department: 'Technology',
            availability: 61,
            engagement: 76,
            influence: 82,
            lastActivity: '5 days ago',
            recentSignals: ['Patent filing for ML algorithms', 'Speaking at tech conference'],
            contactPreference: 'Technical briefings',
            networkConnections: 15,
            communicationStyle: 'Technical, detail-oriented'
          }
        ],
        company2: [
          {
            name: 'James Patterson',
            title: 'Chairman & CEO',
            department: 'Executive',
            availability: 68,
            engagement: 91,
            influence: 97,
            lastActivity: '2 days ago',
            recentSignals: ['Investor call mentioning growth through partnerships', 'Board meeting on M&A strategy'],
            contactPreference: 'Executive assistant',
            networkConnections: 6,
            communicationStyle: 'Results-focused, decisive'
          },
          {
            name: 'Lisa Chang',
            title: 'President & COO',
            department: 'Operations',
            availability: 79,
            engagement: 87,
            influence: 90,
            lastActivity: '1 day ago',
            recentSignals: ['Visited tech hub for partnership meetings', 'Posted about operational scaling'],
            contactPreference: 'Direct phone',
            networkConnections: 11,
            communicationStyle: 'Operational, pragmatic'
          },
          {
            name: 'Robert Kim',
            title: 'Chief Business Officer',
            department: 'Business Development',
            availability: 92,
            engagement: 96,
            influence: 85,
            lastActivity: '4 hours ago',
            recentSignals: ['Multiple partnership RFPs sent', 'Active on industry forums'],
            contactPreference: 'Video call',
            networkConnections: 23,
            communicationStyle: 'Relationship-focused, enthusiastic'
          }
        ]
      },
      forecastedOutcomes: {
        jointVenture: {
          revenueGrowth: '+35%',
          marketShare: '+12%',
          costSynergies: '$85M',
          timeToValue: '18 months',
          riskLevel: 'Medium'
        },
        acquisition: {
          revenueGrowth: '+28%',
          marketShare: '+18%',
          costSynergies: '$120M',
          timeToValue: '24 months',
          riskLevel: 'High'
        },
        strategicAlliance: {
          revenueGrowth: '+22%',
          marketShare: '+8%',
          costSynergies: '$45M',
          timeToValue: '12 months',
          riskLevel: 'Low'
        }
      },
      complementarity: {
        company1Strengths: ['Machine Learning', 'Cloud Infrastructure'],
        company2Strengths: ['Healthcare Data', 'Regulatory Compliance'],
        gaps: ['Market Access', 'Specialized Talent']
      }
    },
    {
      id: 2,
      company1: 'GreenEnergy Corp',
      company2: 'Urban Logistics',
      synergyScore: 87,
      opportunity: 'Sustainable Last-Mile Delivery',
      industries: ['Energy', 'Transportation'],
      potentialValue: '$320M',
      predictability: {
        company1Openness: {
          jointVenture: 71,
          acquisition: 34,
          strategicAlliance: 85
        },
        company2Openness: {
          jointVenture: 69,
          acquisition: 52,
          strategicAlliance: 88
        },
        overallLikelihood: 78,
        indicators: ['ESG investment focus', 'Supply chain optimization needs', 'Regulatory compliance pressures']
      },
      decisionMakers: {
        company1: [
          {
            name: 'Alexandra Torres',
            title: 'Chief Executive Officer',
            department: 'Executive',
            availability: 74,
            engagement: 88,
            influence: 96,
            lastActivity: '2 days ago',
            recentSignals: ['ESG conference keynote', 'Sustainability partnership announcement'],
            contactPreference: 'Morning meetings',
            networkConnections: 9,
            communicationStyle: 'Visionary, sustainability-focused'
          },
          {
            name: 'David Mitchell',
            title: 'VP Strategic Partnerships',
            department: 'Business Development',
            availability: 88,
            engagement: 93,
            influence: 78,
            lastActivity: '6 hours ago',
            recentSignals: ['Partnership MOU signed', 'Industry networking event'],
            contactPreference: 'Coffee meetings',
            networkConnections: 19,
            communicationStyle: 'Relationship-builder, flexible'
          }
        ],
        company2: [
          {
            name: 'Michael Chen',
            title: 'Founder & CEO',
            department: 'Executive',
            availability: 65,
            engagement: 84,
            influence: 94,
            lastActivity: '1 day ago',
            recentSignals: ['Logistics innovation summit', 'Supply chain optimization blog post'],
            contactPreference: 'Executive briefings',
            networkConnections: 14,
            communicationStyle: 'Innovation-driven, analytical'
          },
          {
            name: 'Jennifer Walsh',
            title: 'Chief Operating Officer',
            department: 'Operations',
            availability: 81,
            engagement: 90,
            influence: 87,
            lastActivity: '3 hours ago',
            recentSignals: ['Fleet electrification pilot program', 'Operational efficiency presentation'],
            contactPreference: 'Site visits',
            networkConnections: 16,
            communicationStyle: 'Hands-on, results-oriented'
          }
        ]
      },
      forecastedOutcomes: {
        jointVenture: {
          revenueGrowth: '+28%',
          marketShare: '+15%',
          costSynergies: '$95M',
          timeToValue: '20 months',
          riskLevel: 'Medium'
        },
        acquisition: {
          revenueGrowth: '+31%',
          marketShare: '+22%',
          costSynergies: '$140M',
          timeToValue: '30 months',
          riskLevel: 'High'
        },
        strategicAlliance: {
          revenueGrowth: '+18%',
          marketShare: '+9%',
          costSynergies: '$55M',
          timeToValue: '15 months',
          riskLevel: 'Low'
        }
      },
      complementarity: {
        company1Strengths: ['Clean Technology', 'Battery Systems'],
        company2Strengths: ['Distribution Network', 'Customer Relationships'],
        gaps: ['Technology Integration', 'Capital Investment']
      }
    }
  ];

  const handleSearch = (): void => {
    setResults(mockResults);
  };

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>): void => {
    setList(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const toggleDecisionMakers = (resultId: number, company: string): void => {
    const key = `${resultId}-${company}`;
    setExpandedDecisionMakers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getAvailabilityColor = (score: number): string => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEngagementColor = (score: number): string => {
    if (score >= 85) return 'text-purple-400';
    if (score >= 70) return 'text-blue-400';
    return 'text-orange-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SynergyFinder Pro
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover untapped strategic partnerships and joint venture opportunities through intelligent market analysis
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-2 border border-slate-700">
            {['search', 'analytics', 'opportunities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {tab === 'search' && <Search className="w-4 h-4 inline mr-2" />}
                {tab === 'analytics' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {tab === 'opportunities' && <Target className="w-4 h-4 inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter company name, industry, or technology..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-400 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Analyze Synergies
                </button>
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Industries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => toggleSelection(industry, selectedIndustries, setSelectedIndustries)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedIndustries.includes(industry)
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Key Metrics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {metrics.map((metric) => (
                      <button
                        key={metric}
                        onClick={() => toggleSelection(metric, selectedMetrics, setSelectedMetrics)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedMetrics.includes(metric)
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Strategic Partnership Opportunities</h2>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                {results.map((result) => (
                  <div key={result.id} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-purple-400/50 transition-all duration-300">
                    <div className="space-y-8">
                      {/* Main Partnership Info */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-4 mb-3">
                                <h3 className="text-xl font-bold text-white">{result.company1}</h3>
                                <div className="text-purple-400 text-2xl">⚡</div>
                                <h3 className="text-xl font-bold text-white">{result.company2}</h3>
                              </div>
                              <p className="text-cyan-400 font-medium text-lg">{result.opportunity}</p>
                              <div className="flex gap-2 mt-2">
                                {result.industries.map((industry) => (
                                  <span key={industry} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                                    {industry}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-green-400 mb-1">{result.synergyScore}/100</div>
                              <div className="text-slate-400 text-sm">Synergy Score</div>
                            </div>
                          </div>

                          {/* Partnership Likelihood */}
                          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                            <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-cyan-400" />
                              Partnership Likelihood Analysis
                            </h4>
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                              <div>
                                <h5 className="text-sm text-slate-300 mb-3">{result.company1} Openness</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Joint Venture</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-green-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company1Openness.jointVenture}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-green-400 font-medium">{result.predictability.company1Openness.jointVenture}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">M&A Target</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-yellow-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company1Openness.acquisition}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-yellow-400 font-medium">{result.predictability.company1Openness.acquisition}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Strategic Alliance</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-purple-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company1Openness.strategicAlliance}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-purple-400 font-medium">{result.predictability.company1Openness.strategicAlliance}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-sm text-slate-300 mb-3">{result.company2} Openness</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Joint Venture</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-green-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company2Openness.jointVenture}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-green-400 font-medium">{result.predictability.company2Openness.jointVenture}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">M&A Target</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-yellow-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company2Openness.acquisition}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-yellow-400 font-medium">{result.predictability.company2Openness.acquisition}%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">Strategic Alliance</span>
                                    <div className="flex items-center gap-2">
                                      <div className="w-20 bg-slate-600 rounded-full h-2">
                                        <div 
                                          className="bg-purple-400 h-2 rounded-full" 
                                          style={{width: `${result.predictability.company2Openness.strategicAlliance}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-sm text-purple-400 font-medium">{result.predictability.company2Openness.strategicAlliance}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl font-bold text-cyan-400">{result.predictability.overallLikelihood}%</div>
                                <div className="text-slate-300">Overall Partnership Likelihood</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {result.predictability.overallLikelihood >= 80 && <CheckCircle className="w-5 h-5 text-green-400" />}
                                {result.predictability.overallLikelihood >= 60 && result.predictability.overallLikelihood < 80 && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                                {result.predictability.overallLikelihood < 60 && <AlertTriangle className="w-5 h-5 text-red-400" />}
                              </div>
                            </div>

                            <div className="mt-4">
                              <h5 className="text-sm text-slate-300 mb-2">Key Indicators</h5>
                              <div className="flex flex-wrap gap-2">
                                {result.predictability.indicators.map((indicator, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs">
                                    {indicator}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Decision Makers Analysis */}
                          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                            <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                              <Users className="w-5 h-5 text-blue-400" />
                              Key Decision Makers
                            </h4>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Company 1 Decision Makers */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="text-sm font-medium text-purple-300">{result.company1}</h5>
                                  <button
                                    onClick={() => toggleDecisionMakers(result.id, 'company1')}
                                    className="text-xs text-slate-400 hover:text-white transition-colors"
                                  >
                                    {expandedDecisionMakers[`${result.id}-company1`] ? 'Show Less' : 'Show All'}
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  {result.decisionMakers.company1.slice(0, expandedDecisionMakers[`${result.id}-company1`] ? undefined : 2).map((person, idx) => (
                                    <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <h6 className="font-medium text-white text-sm">{person.name}</h6>
                                          <p className="text-xs text-slate-300">{person.title}</p>
                                          <p className="text-xs text-slate-400">{person.department}</p>
                                        </div>
                                        <div className="text-right">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span className={`text-xs font-medium ${getAvailabilityColor(person.availability)}`}>
                                              {person.availability}% Available
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3 text-slate-400" />
                                            <span className={`text-xs font-medium ${getEngagementColor(person.engagement)}`}>
                                              {person.engagement}% Engaged
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Influence</div>
                                          <div className="text-sm font-medium text-cyan-400">{person.influence}%</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Network</div>
                                          <div className="text-sm font-medium text-green-400">{person.networkConnections}</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Last Active</div>
                                          <div className="text-sm font-medium text-yellow-400">{person.lastActivity}</div>
                                        </div>
                                      </div>

                                      {expandedDecisionMakers[`${result.id}-company1`] && (
                                        <div className="space-y-2 pt-3 border-t border-slate-600">
                                          <div>
                                            <span className="text-xs text-slate-400">Recent Signals: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {person.recentSignals.map((signal, sidx) => (
                                                <span key={sidx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                                                  {signal}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Contact: <span className="text-white">{person.contactPreference}</span></span>
                                            <span className="text-slate-400">Style: <span className="text-white">{person.communicationStyle}</span></span>
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex gap-2 mt-3">
                                        <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                                          <Mail className="w-3 h-3" />
                                          Contact
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                                          <UserCheck className="w-3 h-3" />
                                          Profile
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Company 2 Decision Makers */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="text-sm font-medium text-cyan-300">{result.company2}</h5>
                                  <button
                                    onClick={() => toggleDecisionMakers(result.id, 'company2')}
                                    className="text-xs text-slate-400 hover:text-white transition-colors"
                                  >
                                    {expandedDecisionMakers[`${result.id}-company2`] ? 'Show Less' : 'Show All'}
                                  </button>
                                </div>
                                <div className="space-y-3">
                                  {result.decisionMakers.company2.slice(0, expandedDecisionMakers[`${result.id}-company2`] ? undefined : 2).map((person, idx) => (
                                    <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                                      <div className="flex items-start justify-between mb-2">
                                        <div>
                                          <h6 className="font-medium text-white text-sm">{person.name}</h6>
                                          <p className="text-xs text-slate-300">{person.title}</p>
                                          <p className="text-xs text-slate-400">{person.department}</p>
                                        </div>
                                        <div className="text-right">
                                          <div className="flex items-center gap-1 mb-1">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span className={`text-xs font-medium ${getAvailabilityColor(person.availability)}`}>
                                              {person.availability}% Available
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3 text-slate-400" />
                                            <span className={`text-xs font-medium ${getEngagementColor(person.engagement)}`}>
                                              {person.engagement}% Engaged
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Influence</div>
                                          <div className="text-sm font-medium text-cyan-400">{person.influence}%</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Network</div>
                                          <div className="text-sm font-medium text-green-400">{person.networkConnections}</div>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-xs text-slate-400">Last Active</div>
                                          <div className="text-sm font-medium text-yellow-400">{person.lastActivity}</div>
                                        </div>
                                      </div>

                                      {expandedDecisionMakers[`${result.id}-company2`] && (
                                        <div className="space-y-2 pt-3 border-t border-slate-600">
                                          <div>
                                            <span className="text-xs text-slate-400">Recent Signals: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {person.recentSignals.map((signal, sidx) => (
                                                <span key={sidx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                                                  {signal}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Contact: <span className="text-white">{person.contactPreference}</span></span>
                                            <span className="text-slate-400">Style: <span className="text-white">{person.communicationStyle}</span></span>
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex gap-2 mt-3">
                                        <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                                          <Mail className="w-3 h-3" />
                                          Contact
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                                          <UserCheck className="w-3 h-3" />
                                          Profile
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Complementarity Analysis */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-medium text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-purple-400" />
                                {result.company1} Strengths
                              </h4>
                              <div className="space-y-2">
                                {result.complementarity.company1Strengths.map((strength, idx) => (
                                  <div key={idx} className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                                    {strength}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-cyan-400" />
                                {result.company2} Strengths
                              </h4>
                              <div className="space-y-2">
                                {result.complementarity.company2Strengths.map((strength, idx) => (
                                  <div key={idx} className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm">
                                    {strength}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Panel */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                            <div className="text-2xl font-bold text-green-400 mb-2">{result.potentialValue}</div>
                            <div className="text-green-300 text-sm">Estimated Value</div>
                          </div>

                          <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Full Analysis
                            </button>
                            <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                              <Users className="w-4 h-4" />
                              Schedule Meeting
                            </button>
                            <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" />
                              Export Report
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Forecasted Outcomes */}
                      <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                        <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          Forecasted Outcomes by Deal Structure
                        </h4>
                        
                        {/* Deal Type Selector */}
                        <div className="flex gap-2 mb-6">
                          {[
                            { key: 'jointVenture', label: 'Joint Venture', color: 'green' },
                            { key: 'acquisition', label: 'Acquisition', color: 'yellow' },
                            { key: 'strategicAlliance', label: 'Strategic Alliance', color: 'purple' }
                          ].map((dealType) => (
                            <button
                              key={dealType.key}
                              onClick={() => setSelectedDealType(dealType.key)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                selectedDealType === dealType.key
                                  ? `bg-${dealType.color}-500 text-white`
                                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              }`}
                            >
                              {dealType.label}
                            </button>
                          ))}
                        </div>

                        {/* Forecast Metrics */}
                        <div className="grid md:grid-cols-5 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Percent className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-slate-300">Revenue Growth</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400">
                              {result.forecastedOutcomes[selectedDealType].revenueGrowth}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <BarChart3 className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-slate-300">Market Share</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">
                              {result.forecastedOutcomes[selectedDealType].marketShare}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-purple-400" />
                              <span className="text-sm text-slate-300">Cost Synergies</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-400">
                              {result.forecastedOutcomes[selectedDealType].costSynergies}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm text-slate-300">Time to Value</span>
                            </div>
                            <div className="text-2xl font-bold text-cyan-400">
                              {result.forecastedOutcomes[selectedDealType].timeToValue}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-orange-400" />
                              <span className="text-sm text-slate-300">Risk Level</span>
                            </div>
                            <div className={`text-2xl font-bold ${
                              result.forecastedOutcomes[selectedDealType].riskLevel === 'Low' ? 'text-green-400' :
                              result.forecastedOutcomes[selectedDealType].riskLevel === 'Medium' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {result.forecastedOutcomes[selectedDealType].riskLevel}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Market Intelligence Overview */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-400" />
                Market Intelligence Dashboard
              </h3>
              
              {/* Key Metrics Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2,847</div>
                  <div className="text-blue-300 text-sm">Companies Analyzed</div>
                  <div className="text-xs text-slate-400 mt-1">+12% this month</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
                  <div className="text-green-300 text-sm">Prediction Accuracy</div>
                  <div className="text-xs text-slate-400 mt-1">Last 6 months</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
                  <div className="text-purple-300 text-sm">Active Opportunities</div>
                  <div className="text-xs text-slate-400 mt-1">High likelihood</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">$2.1B</div>
                  <div className="text-orange-300 text-sm">Total Deal Value</div>
                  <div className="text-xs text-slate-400 mt-1">Pipeline</div>
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Market Trends
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">AI/ML Partnerships</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
                        </div>
                        <span className="text-green-400 text-sm">↑ 34%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">ESG/Sustainability</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full w-3/5"></div>
                        </div>
                        <span className="text-blue-400 text-sm">↑ 28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">FinTech Integration</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full w-2/3"></div>
                        </div>
                        <span className="text-purple-400 text-sm">↑ 22%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Healthcare Tech</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div className="bg-cyan-400 h-2 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-cyan-400 text-sm">↑ 19%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Geographic Hotspots
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">North America</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-medium">847 deals</span>
                        <span className="text-xs text-green-400">↑ 15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Europe</span>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-medium">623 deals</span>
                        <span className="text-xs text-blue-400">↑ 8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Asia-Pacific</span>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-medium">492 deals</span>
                        <span className="text-xs text-purple-400">↑ 23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Emerging Markets</span>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-medium">284 deals</span>
                        <span className="text-xs text-orange-400">↑ 41%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Models Performance */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-purple-400" />
                AI Model Performance
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4">Partnership Likelihood Model</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Accuracy</span>
                      <span className="text-green-400 font-medium">89.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Precision</span>
                      <span className="text-blue-400 font-medium">91.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Recall</span>
                      <span className="text-purple-400 font-medium">87.3%</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-4">Last updated: 2 hours ago</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4">Synergy Value Predictor</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">MAE</span>
                      <span className="text-green-400 font-medium">±12.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">R² Score</span>
                      <span className="text-blue-400 font-medium">0.847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Confidence</span>
                      <span className="text-purple-400 font-medium">94.1%</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-4">Training data: 50k+ deals</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4">Risk Assessment Engine</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Risk Calibration</span>
                      <span className="text-green-400 font-medium">92.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Early Warning</span>
                      <span className="text-blue-400 font-medium">88.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">ROC-AUC</span>
                      <span className="text-purple-400 font-medium">0.912</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-4">Monitors 200+ risk factors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-8">
            {/* Opportunity Pipeline */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-cyan-400" />
                Curated Opportunity Pipeline
              </h3>
              
              {/* Pipeline Stages */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                  <h4 className="font-medium text-white mb-3">Discovery</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-2">47</div>
                  <p className="text-blue-300 text-sm">New opportunities identified</p>
                  <div className="mt-4">
                    <div className="text-xs text-slate-400 mb-1">This week: +12</div>
                    <div className="w-full bg-slate-600 rounded-full h-1">
                      <div className="bg-blue-400 h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                  <h4 className="font-medium text-white mb-3">Analysis</h4>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">23</div>
                  <p className="text-yellow-300 text-sm">Under deep analysis</p>
                  <div className="mt-4">
                    <div className="text-xs text-slate-400 mb-1">Avg time: 5.2 days</div>
                    <div className="w-full bg-slate-600 rounded-full h-1">
                      <div className="bg-yellow-400 h-1 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                  <h4 className="font-medium text-white mb-3">Qualified</h4>
                  <div className="text-3xl font-bold text-green-400 mb-2">18</div>
                  <p className="text-green-300 text-sm">High-probability matches</p>
                  <div className="mt-4">
                    <div className="text-xs text-slate-400 mb-1">Success rate: 76%</div>
                    <div className="w-full bg-slate-600 rounded-full h-1">
                      <div className="bg-green-400 h-1 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                  <h4 className="font-medium text-white mb-3">Active</h4>
                  <div className="text-3xl font-bold text-purple-400 mb-2">8</div>
                  <p className="text-purple-300 text-sm">In negotiation</p>
                  <div className="mt-4">
                    <div className="text-xs text-slate-400 mb-1">Avg value: $180M</div>
                    <div className="w-full bg-slate-600 rounded-full h-1">
                      <div className="bg-purple-400 h-1 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* High Priority Opportunities */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  High Priority Opportunities
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <div>
                        <h5 className="font-medium text-white">CloudSecure × DataShield</h5>
                        <p className="text-slate-400 text-sm">Cybersecurity Platform Integration</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">$680M</div>
                      <div className="text-xs text-slate-400">94% match</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div>
                        <h5 className="font-medium text-white">BioTech Labs × PharmaGlobal</h5>
                        <p className="text-slate-400 text-sm">Drug Discovery Partnership</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">$1.2B</div>
                      <div className="text-xs text-slate-400">91% match</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <div>
                        <h5 className="font-medium text-white">FinFlow × RegTech Solutions</h5>
                        <p className="text-slate-400 text-sm">Compliance Automation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">$340M</div>
                      <div className="text-xs text-slate-400">88% match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Signals */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-400" />
                Real-Time Market Signals
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Emerging Opportunities
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-green-300 text-sm font-medium">AI Chip Manufacturing</p>
                        <p className="text-slate-400 text-xs">3 new partnership signals detected</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-blue-300 text-sm font-medium">Quantum Computing</p>
                        <p className="text-slate-400 text-xs">Major funding round announced</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-purple-300 text-sm font-medium">Space Technology</p>
                        <p className="text-slate-400 text-xs">Government contracts opening</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Risk Alerts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-red-300 text-sm font-medium">Regulatory Changes</p>
                        <p className="text-slate-400 text-xs">New EU AI Act compliance requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-yellow-300 text-sm font-medium">Market Volatility</p>
                        <p className="text-slate-400 text-xs">Tech sector experiencing fluctuations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-orange-300 text-sm font-medium">Supply Chain</p>
                        <p className="text-slate-400 text-xs">Semiconductor shortage impacting deals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SynergyFinderApp;
