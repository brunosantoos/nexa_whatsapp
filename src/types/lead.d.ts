export interface Leads {
  leads: {
    id: string;
    email: string;
    name: string;
    company: string;
    job_title: string | null;
    bio: string | null;
    public_url: string;
    created_at: string;
    opportunity: boolean;
    number_conversions: string;
    user: string | null;
    first_conversion: {
      content: {
        email_lead: string;
        nome: string;
        empresa: string;
        created_at: string;
        identificador: string;
        company_id: number;
        company_uuid: string;
        id: number;
        uuid: string;
        funnel_uuid: string;
        leads_manager_id: number;
        tags: string;
        'Opt-in Email': boolean;
        import_token: string;
      };
      created_at: string;
      cumulative_sum: string;
      source: string;
      conversion_origin: {
        source: string;
        medium: string;
        value: string | null;
        campaign: string;
        channel: string;
      };
    };
    last_conversion: {
      content: {
        email_lead: string;
        nome: string;
        empresa: string;
        created_at: string;
        identificador: string;
        company_id: number;
        company_uuid: string;
        id: number;
        uuid: string;
        funnel_uuid: string;
        leads_manager_id: number;
        tags: string;
        'Opt-in Email': boolean;
        import_token: string;
      };
      created_at: string;
      cumulative_sum: string;
      source: string;
      conversion_origin: {
        source: string;
        medium: string;
        value: string | null;
        campaign: string;
        channel: string;
      };
    };
    custom_fields: CustomFields;
    website: string | null;
    personal_phone: string | null;
    mobile_phone: string | null;
    city: string | null;
    state: string | null;
    tags: string[];
    lead_stage: string;
    last_marked_opportunity_date: string | null;
    uuid: string;
    fit_score: string;
    interest: number;
  }[];
}

interface CustomFields {
  'Origem da Oportunidade no CRM (última atualização)': string;
  'Qualificação da Oportunidade no CRM (última atualização)': string;
  'Etapa do funil de vendas no CRM (última atualização)': string;
  'Valor total da Oportunidade no CRM (última atualização)': string;
  'Nome do responsável pela Oportunidade no CRM (última atualização)': string;
  'Funil de vendas no CRM (última atualização)': string;
  'Curso de interesse': string;
  'Forma de Ingresso': string;
  CPF: string;
  'Data de Nascimento': string;
}
