import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';

// Define interfaces
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

interface ResultType {
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

// Mock data
const mockResults: ResultType[] = [
  {
    id: 1,
    company1: 'Company A',
    company2: 'Company B',
    synergyScore: 85,
    opportunity: 'Joint venture in renewable energy',
    industries: ['Energy', 'Technology'],
    potentialValue: 'High',
    predictability: {
      company1Openness: {
        jointVenture: 90,
        acquisition: 40,
        strategicAlliance: 70,
      },
      company2Openness: {
        jointVenture: 85,
        acquisition: 50,
        strategicAlliance: 75,
      },
      overallLikelihood: 82,
      indicators: ['Shared values', 'Complementary assets'],
    },
    decisionMakers: {
      company1: [
        {
          name: 'Alice Johnson',
          title: 'VP of Strategy',
          department: 'Corporate Strategy',
          availability: 80,
          engagement: 70,
          influence: 90,
          lastActivity: '2023-10-01',
          recentSignals: ['Attended industry summit', 'Commented on sustainability'],
          contactPreference: 'Email',
          networkConnections: 50,
          communicationStyle: 'Data-driven',
        },
      ],
      company2: [
        {
          name: 'Bob Smith',
          title: 'Chief Innovation Officer',
          department: 'R&D',
          availability: 70,
          engagement: 80,
          influence: 85,
          lastActivity: '2023-10-03',
          recentSignals: ['Published a white paper', 'Increased LinkedIn activity'],
          contactPreference: 'Phone',
          networkConnections: 60,
          communicationStyle: 'Visionary',
        },
      ],
    },
    forecastedOutcomes: {
      jointVenture: {
        revenueGrowth: '25%',
        marketShare: '15%',
        costSynergies: '10%',
        timeToValue: '1 year',
        riskLevel: 'Medium',
      },
      acquisition: {
        revenueGrowth: '35%',
        marketShare: '20%',
        costSynergies: '20%',
        timeToValue: '2 years',
        riskLevel: 'High',
      },
      strategicAlliance: {
        revenueGrowth: '20%',
        marketShare: '10%',
        costSynergies: '8%',
        timeToValue: '1.5 years',
        riskLevel: 'Low',
      },
    },
    complementarity: {
      company1Strengths: ['Advanced technology', 'Strong brand'],
      company2Strengths: ['Large distribution network', 'Innovative R&D'],
      gaps: ['Customer service alignment'],
    },
  },
];

const SynergyFinderApp: React.FC = () => {
  const [companyInput, setCompanyInput] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<ResultType[]>([]);

  const handleSearch = () => {
    setResults(mockResults);
  };

  const toggleSelection = (item: ResultType, list: ResultType[], setList: React.Dispatch<React.SetStateAction<ResultType[]>>) => {
    const exists = list.find(i => i.id === item.id);
    if (exists) {
      setList(list.filter(i => i.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Synergy Finder Pro
      </Typography>
      <TextField
        fullWidth
        label="Enter company name"
        value={companyInput}
        onChange={(e) => setCompanyInput(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {results.map((result) => (
          <Grid item xs={12} md={6} key={result.id}>
            <Card
              onClick={() =>
                toggleSelection(result, selectedOpportunities, setSelectedOpportunities)
              }
              style={{
                backgroundColor: selectedOpportunities.find((i) => i.id === result.id)
                  ? '#e0f7fa'
                  : 'white',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {result.company1} &amp; {result.company2}
                </Typography>
                <Typography>Opportunity: {result.opportunity}</Typography>
                <Typography>Score: {result.synergyScore}</Typography>
                <Typography>Value: {result.potentialValue}</Typography>
                <div style={{ marginTop: '8px' }}>
                  {result.industries.map((industry) => (
                    <Chip
                      key={industry}
                      label={industry}
                      size="small"
                      style={{ marginRight: '5px' }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SynergyFinderApp;
