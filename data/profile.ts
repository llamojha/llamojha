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
    "DevOps and platform engineer specialised in observability, large-scale commerce, and serverless-first architectures. Alvaro pairs deep AWS expertise with a coaching mindset to help teams ship faster, safer, and with confidence.",
  highlights: [
    "Led observability and incident response for JD Sports' Black Friday peak season with New Relic and custom dashboards.",
    "Scaled LEGO.com's multi-channel commerce platform using AWS Serverless, ECS Fargate, and Terraform.",
    "Mentors the next wave of cloud engineers through CodeYourFuture and bespoke DevOps bootcamps."
  ],
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
    role: "Senior DevOps & New Relic Engineer",
    company: "JD Sports",
    url: "https://www.jdsports.co.uk",
    location: "London",
    timeframe: "Sep 2022 – Feb 2023",
    summary:
      "Brought end-to-end observability to multi-channel commerce operations during peak retail season.",
    achievements: [
      "Implemented New Relic to unify monitoring across frontends, backends, and third-party services.",
      "Created a command-centre dashboard so support teams could triage incidents in seconds during Black Friday.",
      "Established proactive alerting that safeguarded system reliability across critical customer journeys."
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
      "Designed the first wave of serverless microservices with TypeScript, backed by automated CI/CD in CircleCI and GitHub.",
      "Transitioned workloads to AWS ECS Fargate and Terraform, modernising the monorepo infrastructure and deployments.",
      "Drove high-severity incidents to zero during Black Friday through improved monitoring with New Relic, Elasticsearch, and PagerDuty.",
      "Champion of developer experience: introduced PR environments and progressive delivery with git-tag deployments."
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
      "Rolled out Docker-based environments across local development and AWS ECS.",
      "Strengthened production monitoring using New Relic, CloudWatch, and PagerDuty to reduce false alarms."
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
