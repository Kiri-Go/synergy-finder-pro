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

// --- Added explicit type ---
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

const SynergyFinderApp = () => {
  const [companyInput, setCompanyInput] = useState('');
  const [results, setResults] = useState<ResultType[]>([]); // ✅ Fixed here
  const [selectedOpportunities, setSelectedOpportunities] = useState<ResultType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ResultType | null>(null);

  const handleSearch = () => {
    setResults(mockResults);
  };
  const toggleSelection = (
    item: ResultType,
    list: ResultType[],
    setList: React.Dispatch<React.SetStateAction<ResultType[]>>
  ) => {
    const exists = list.find((i) => i.id === item.id);
    if (exists) {
      setList(list.filter((i) => i.id !== item.id));
    } else {
      setList([...list, item]);
    }
  };

  const handleCardClick = (item: ResultType) => {
    setModalContent(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
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
              onClick={() => handleCardClick(result)}
              style={{
                backgroundColor: selectedOpportunities.find((i) => i.id === result.id)
                  ? '#e0f7fa'
                  : 'white',
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {result.company1} & {result.company2}
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

      {showModal && modalContent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h5" gutterBottom>
              {modalContent.company1} & {modalContent.company2}
            </Typography>
            <Typography variant="subtitle1">Opportunity: {modalContent.opportunity}</Typography>
            <Typography variant="subtitle2" style={{ marginTop: '10px' }}>
              Synergy Score: {modalContent.synergyScore}
            </Typography>
            <Typography>Potential Value: {modalContent.potentialValue}</Typography>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Predictability
            </Typography>
            <Typography>Overall Likelihood: {modalContent.predictability.overallLikelihood}</Typography>
            <ul>
              {modalContent.predictability.indicators.map((indicator, i) => (
                <li key={i}>{indicator}</li>
              ))}
            </ul>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Forecasted Outcomes
            </Typography>
            {Object.entries(modalContent.forecastedOutcomes).map(([type, outcome]) => (
              <div key={type}>
                <Typography variant="subtitle1">{type}</Typography>
                <ul>
                  {Object.entries(outcome).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Complementarity
            </Typography>
            <Typography>Company 1 Strengths:</Typography>
            <ul>
              {modalContent.complementarity.company1Strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <Typography>Company 2 Strengths:</Typography>
            <ul>
              {modalContent.complementarity.company2Strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <Typography>Gaps:</Typography>
            <ul>
              {modalContent.complementarity.gaps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Decision Makers
            </Typography>
            {['company1', 'company2'].map((companyKey) => (
              <div key={companyKey}>
                <Typography variant="subtitle1">{companyKey}</Typography>
                {modalContent.decisionMakers[companyKey as 'company1' | 'company2'].map((dm, i) => (
                  <div key={i}>
                    <Typography>{dm.name} - {dm.title}</Typography>
                    <Typography>Department: {dm.department}</Typography>
                    <Typography>Availability: {dm.availability}%</Typography>
                    <Typography>Engagement: {dm.engagement}%</Typography>
                    <Typography>Influence: {dm.influence}%</Typography>
                    <Typography>Last Activity: {dm.lastActivity}</Typography>
                    <Typography>Contact Preference: {dm.contactPreference}</Typography>
                    <Typography>Communication Style: {dm.communicationStyle}</Typography>
                    <Typography>Network Connections: {dm.networkConnections}</Typography>
                    <Typography>Recent Signals:</Typography>
                    <ul>
                      {dm.recentSignals.map((sig, j) => (
                        <li key={j}>{sig}</li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default SynergyFinderApp;
