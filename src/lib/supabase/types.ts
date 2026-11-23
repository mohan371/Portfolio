/**
-- =============================================================================
-- Supabase Database Types for Mohan N.V. Portfolio Platform
-- Maps directly to PostgreSQL schemas and tables defined in supabase/migrations/
-- =============================================================================
*/

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProjectStatus = "Completed" | "In Development" | "Production" | "Archived";
export type SkillCategory = "languages" | "frontend" | "backend" | "databases" | "devops" | "architecture";
export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Familiar";
export type AdminRole = "superadmin" | "admin" | "editor";
export type EnquiryStatus = "unread" | "in_review" | "responded" | "archived";

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: AdminRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: AdminRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: AdminRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: SkillCategory;
          level: SkillLevel;
          years_of_experience: number;
          icon_name: string | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: SkillCategory;
          level?: SkillLevel;
          years_of_experience?: number;
          icon_name?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          category?: SkillCategory;
          level?: SkillLevel;
          years_of_experience?: number;
          icon_name?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string;
          detailed_description: string;
          category: string;
          thumbnail_url: string;
          github_url: string | null;
          live_demo_url: string | null;
          status: ProjectStatus;
          is_featured: boolean;
          is_published: boolean;
          start_date: string | null;
          completion_date: string | null;
          problem_statement: string | null;
          solution: string | null;
          architecture_summary: string | null;
          architecture_nodes: Json;
          key_features: string[];
          challenges: Json;
          lessons_learned: string[];
          sort_order: number;
          published_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description: string;
          detailed_description: string;
          category: string;
          thumbnail_url: string;
          github_url?: string | null;
          live_demo_url?: string | null;
          status?: ProjectStatus;
          is_featured?: boolean;
          is_published?: boolean;
          start_date?: string | null;
          completion_date?: string | null;
          problem_statement?: string | null;
          solution?: string | null;
          architecture_summary?: string | null;
          architecture_nodes?: Json;
          key_features?: string[];
          challenges?: Json;
          lessons_learned?: string[];
          sort_order?: number;
          published_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string;
          detailed_description?: string;
          category?: string;
          thumbnail_url?: string;
          github_url?: string | null;
          live_demo_url?: string | null;
          status?: ProjectStatus;
          is_featured?: boolean;
          is_published?: boolean;
          start_date?: string | null;
          completion_date?: string | null;
          problem_statement?: string | null;
          solution?: string | null;
          architecture_summary?: string | null;
          architecture_nodes?: Json;
          key_features?: string[];
          challenges?: Json;
          lessons_learned?: string[];
          sort_order?: number;
          published_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_technologies: {
        Row: {
          project_id: string;
          skill_id: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          project_id: string;
          skill_id: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          project_id?: string;
          skill_id?: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      project_galleries: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          caption: string | null;
          alt_text: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          caption?: string | null;
          alt_text: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          caption?: string | null;
          alt_text?: string;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      experience: {
        Row: {
          id: string;
          role: string;
          company: string;
          company_url: string | null;
          period: string;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          location: string;
          employment_type: string;
          domain: string | null;
          description: string;
          highlights: string[];
          technologies_used: string[];
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          company: string;
          company_url?: string | null;
          period: string;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          location: string;
          employment_type?: string;
          domain?: string | null;
          description: string;
          highlights?: string[];
          technologies_used?: string[];
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          company?: string;
          company_url?: string | null;
          period?: string;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          location?: string;
          employment_type?: string;
          domain?: string | null;
          description?: string;
          highlights?: string[];
          technologies_used?: string[];
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      education: {
        Row: {
          id: string;
          degree: string;
          institution: string;
          institution_url: string | null;
          year: string;
          start_year: number;
          end_year: number;
          field: string;
          highlights: string[];
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          degree: string;
          institution: string;
          institution_url?: string | null;
          year: string;
          start_year: number;
          end_year: number;
          field: string;
          highlights?: string[];
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          degree?: string;
          institution?: string;
          institution_url?: string | null;
          year?: string;
          start_year?: number;
          end_year?: number;
          field?: string;
          highlights?: string[];
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content_markdown: string;
          cover_image_url: string | null;
          category: string;
          read_time_minutes: number;
          tags: string[];
          is_published: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content_markdown: string;
          cover_image_url?: string | null;
          category: string;
          read_time_minutes?: number;
          tags?: string[];
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content_markdown?: string;
          cover_image_url?: string | null;
          category?: string;
          read_time_minutes?: number;
          tags?: string[];
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string;
          author_company: string;
          author_avatar_url: string | null;
          content: string;
          relationship: string | null;
          rating: number;
          is_verified: boolean;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_name: string;
          author_role: string;
          author_company: string;
          author_avatar_url?: string | null;
          content: string;
          relationship?: string | null;
          rating?: number;
          is_verified?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          author_role?: string;
          author_company?: string;
          author_avatar_url?: string | null;
          content?: string;
          relationship?: string | null;
          rating?: number;
          is_verified?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      company_profile: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          mission: string;
          description: string;
          founded_year: number;
          location: string;
          contact_email: string;
          status: string;
          metrics: Json;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          tagline: string;
          mission: string;
          description: string;
          founded_year?: number;
          location: string;
          contact_email: string;
          status?: string;
          metrics?: Json;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          mission?: string;
          description?: string;
          founded_year?: number;
          location?: string;
          contact_email?: string;
          status?: string;
          metrics?: Json;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      company_services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          deliverables: string[];
          technologies: string[];
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          deliverables?: string[];
          technologies?: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          deliverables?: string[];
          technologies?: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          service_interest: string | null;
          budget_range: string | null;
          status: EnquiryStatus;
          ip_hash: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          service_interest?: string | null;
          budget_range?: string | null;
          status?: EnquiryStatus;
          ip_hash?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          service_interest?: string | null;
          budget_range?: string | null;
          status?: EnquiryStatus;
          ip_hash?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      website_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      project_status: ProjectStatus;
      skill_category: SkillCategory;
      skill_level: SkillLevel;
      admin_role: AdminRole;
      enquiry_status: EnquiryStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
