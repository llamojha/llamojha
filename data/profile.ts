export type Experience = {
  role: string;
  company: string;
  url?: string;
  location: string;
  timeframe: string;
  summary: string;
  achievements: string[];
};

export type Talk = {
  title: string;
  event: string;
  year: string;
  url?: string;
};

export const profile = {
  name: "Alvaro Llamojha",
  title: "Senior DevOps & Observability Engineer",
  location: "London, United Kingdom",
  summary:
    "DevOps and platform engineer specialised in observability, large-scale commerce, and serverless-first architectures. Recent programmes cut MTTR by 35%, lifted release cadence 4x, and safeguarded £500m+ annual digital revenue while coaching teams to operate with confidence.",
  highlights: [
    "2023: Stabilised JD Sports' global peak trading by delivering MTTR dashboards, cutting critical incident duration by 38% year-on-year.",
    "2022: Scaled LEGO.com's multi-channel commerce platform using AWS Serverless, ECS Fargate, and Terraform to support £1.2bn online revenue.",
    "Mentors the next wave of cloud engineers through CodeYourFuture and bespoke DevOps bootcamps, graduating 50+ engineers since 2019."
  ],
  impact: [
    {
      value: "£500m+",
      label: "Digital revenue safeguarded across peak events"
    },
    {
      value: "4x",
      label: "Deployment cadence uplift delivered with modern delivery"
    },
    {
      value: "35%",
      label: "Mean-time-to-recovery reduction across major programmes"
    }
  ],
  trustedBy: ["LEGO", "JD Sports", "Kingfisher"],
  callToAction: {
    label: "Let’s build resilient platforms together",
    href: "mailto:hello@llamojha.dev"
  }
};

export const expertise = [
  "AWS & Cloud Architecture",
  "Serverless & Container Platforms",
  "Observability with New Relic",
  "CI/CD Automation",
  "Incident Response Leadership",
  "Developer Experience"
];

export const experience: Experience[] = [
  {
    role: "Director & Principal Consultant",
    company: "No Limits Solutions",
    location: "London",
    timeframe: "May 2022 – Present",
    summary:
      "Founding director of a boutique consultancy delivering observability, SRE, and platform engineering leadership for retail and data-driven organisations.",
    achievements: [
      "Directed JD Sports' 2023 peak-season observability rollout: unified 120+ services into New Relic dashboards, halving MTTR and protecting £85m Black Friday revenue.",
      "Embedded with Kingfisher's 40-person Big Data organisation to codify SLOs, reduce alert noise by 55%, and introduce a 24/7 rota with playbooks.",
      "Piloted generative-AI runbooks that auto-summarised PagerDuty incidents, trimming post-incident write-up time by 60%."
    ]
  },
  {
    role: "Senior AWS DevOps & Serverless Engineer",
    company: "LEGO",
    url: "https://www.lego.com",
    location: "London",
    timeframe: "May 2018 – May 2022",
    summary:
      "Delivered the platform foundations that enabled LEGO.com to release faster while staying resilient during record sales peaks.",
    achievements: [
      "Launched 45+ serverless microservices with TypeScript, each backed by CircleCI/GitHub pipelines that lifted deployment frequency from weekly to daily.",
      "Transitioned 30% of workloads to AWS ECS Fargate and Terraform, retiring 200+ manual change steps across the monorepo.",
      "Drove high-severity incidents to zero during two consecutive Black Fridays via New Relic/Elasticsearch insights and an automated on-call drill programme.",
      "Champion of developer experience: rolled out PR environments and git-tag progressive delivery, cutting lead time for changes from 5 days to 24 hours."
    ]
  },
  {
    role: "DevOps Engineer",
    company: "Secret Sales",
    url: "https://www.secretsales.com",
    location: "London",
    timeframe: "Aug 2017 – May 2018",
    summary:
      "Modernised an e-commerce flash sale platform with containerisation and actionable observability.",
    achievements: [
      "Rolled out Docker-based environments across local development and AWS ECS, shrinking release preparation time from 2 days to 4 hours.",
      "Strengthened production monitoring with New Relic, CloudWatch, and PagerDuty, eliminating 70% of false alarms and stabilising a £15m annual GMV platform."
    ]
  },
  {
    role: "DevOps Engineer",
    company: "Shopological",
    url: "https://www.shopological.com",
    location: "London",
    timeframe: "Aug 2016 – Aug 2017",
    summary: "Connected shoppers with retailers by evolving the platform's reliability and automation.",
    achievements: [
      "Worked across AWS, Terraform, Ansible, Rackspace, and Sensu to keep services resilient.",
      "Improved observability pipelines with ELK and GOCD-led delivery."
    ]
  },
  {
    role: "Systems Engineer",
    company: "MetaBroadcast",
    url: "https://www.metabroadcast.com",
    location: "London",
    timeframe: "Aug 2015 – Aug 2016",
    summary: "Supported metadata services for major UK broadcasters with dependable cloud infrastructure.",
    achievements: [
      "Built and maintained AWS and Ubuntu estates with Puppet and Sensu.",
      "Optimised incident response across Kafka and Cassandra-backed workloads."
    ]
  },
  {
    role: "Linux Systems Administrator",
    company: "Indra UK",
    url: "https://www.indracompany.com",
    location: "Whiteley, Hampshire",
    timeframe: "Apr 2012 – Aug 2015",
    summary: "Maintained mission-critical systems for UK Air Traffic Management at NATS.",
    achievements: [
      "Ensured high-availability Linux environments supporting national air traffic operations.",
      "Collaborated with engineering teams to roll out resilient monitoring and automation."
    ]
  }
];

export const education = [
  {
    name: "AWS Solutions Architect – Associate",
    institution: "Amazon Web Services",
    year: "2020"
  },
  {
    name: "Advanced C++ Development",
    institution: "QA Training, London",
    year: "2014"
  }
];

export const talks: Talk[] = [
  {
    title: "CI/CD & Monorepos: Our Approach for LEGO.com",
    event: "The National DevOps Conference / Geekle DevOpsStarts",
    year: "2021 – 2022"
  },
  {
    title: "Tag-Based Deployment for a Serverless Monorepo",
    event: "GCS Connect",
    year: "2020",
    url: "https://www.youtube.com/watch?v=Dg2WcgMZ62Y"
  },
  {
    title: "Fargate Journey of LEGO.com",
    event: "LEGO.com Software Engineer Meetup",
    year: "2019"
  }
];

export const volunteering = [
  {
    name: "Scout Leader & Mentor",
    summary:
      "A decade of scout volunteering leading camps, charity projects, and youth instructor programmes—building teamwork and resilience."
  },
  {
    name: "CodeYourFuture Mentor",
    summary:
      "Guiding aspiring developers through cloud and DevOps modules, including a bespoke five-week introduction to DevOps."
  },
  {
    name: "No Limits Solutions Consultant",
    summary:
      "Independent DevOps consultancy focused on observability, alerting, and GenAI-powered personal projects."
  }
];

export const interests = [
  "Community-led mentoring",
  "Observability strategy",
  "Platform reliability",
  "Generative AI experiments"
];
