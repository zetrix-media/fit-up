export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      administration: {
        Row: {
          email: string | null
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          password?: string | null
          username?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          brandid: number
          brandname: string | null
        }
        Insert: {
          brandid?: number
          brandname?: string | null
        }
        Update: {
          brandid?: number
          brandname?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          categoryid: number
          categoryimage: string | null
          categoryname: string | null
          productcount: number | null
        }
        Insert: {
          categoryid?: number
          categoryimage?: string | null
          categoryname?: string | null
          productcount?: number | null
        }
        Update: {
          categoryid?: number
          categoryimage?: string | null
          categoryname?: string | null
          productcount?: number | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          customerid: number
          email: string | null
          name: string | null
          password: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          customerid?: number
          email?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          customerid?: number
          email?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      orderdetails: {
        Row: {
          orderdetailid: number
          orderid: number | null
          price: number | null
          quantity: number | null
          variantid: number | null
        }
        Insert: {
          orderdetailid?: number
          orderid?: number | null
          price?: number | null
          quantity?: number | null
          variantid?: number | null
        }
        Update: {
          orderdetailid?: number
          orderid?: number | null
          price?: number | null
          quantity?: number | null
          variantid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderdetails_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["orderid"]
          },
          {
            foreignKeyName: "orderdetails_variantid_fkey"
            columns: ["variantid"]
            isOneToOne: false
            referencedRelation: "productvariants"
            referencedColumns: ["variantid"]
          },
        ]
      }
      orders: {
        Row: {
          createdat: string | null
          customerid: number | null
          orderid: number
          orderstatus: string | null
          totalamount: number | null
        }
        Insert: {
          createdat?: string | null
          customerid?: number | null
          orderid?: number
          orderstatus?: string | null
          totalamount?: number | null
        }
        Update: {
          createdat?: string | null
          customerid?: number | null
          orderid?: number
          orderstatus?: string | null
          totalamount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customerid_fkey"
            columns: ["customerid"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customerid"]
          },
        ]
      }
      products: {
        Row: {
          baseprice: number | null
          brandid: number | null
          categoryid: number | null
          createdat: string | null
          description: string | null
          name: string | null
          productid: number
          updatedat: string | null
        }
        Insert: {
          baseprice?: number | null
          brandid?: number | null
          categoryid?: number | null
          createdat?: string | null
          description?: string | null
          name?: string | null
          productid?: number
          updatedat?: string | null
        }
        Update: {
          baseprice?: number | null
          brandid?: number | null
          categoryid?: number | null
          createdat?: string | null
          description?: string | null
          name?: string | null
          productid?: number
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brandid_fkey"
            columns: ["brandid"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["brandid"]
          },
          {
            foreignKeyName: "products_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["categoryid"]
          },
        ]
      }
      productvariants: {
        Row: {
          color: string | null
          createdat: string | null
          mainimageurl: string | null
          price: number | null
          productid: number | null
          size: string | null
          sku: string | null
          stock: number | null
          updatedat: string | null
          variantid: number
        }
        Insert: {
          color?: string | null
          createdat?: string | null
          mainimageurl?: string | null
          price?: number | null
          productid?: number | null
          size?: string | null
          sku?: string | null
          stock?: number | null
          updatedat?: string | null
          variantid?: number
        }
        Update: {
          color?: string | null
          createdat?: string | null
          mainimageurl?: string | null
          price?: number | null
          productid?: number | null
          size?: string | null
          sku?: string | null
          stock?: number | null
          updatedat?: string | null
          variantid?: number
        }
        Relationships: [
          {
            foreignKeyName: "productvariants_productid_fkey"
            columns: ["productid"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["productid"]
          },
        ]
      }
      variantimages: {
        Row: {
          createdat: string | null
          imageid: number
          imageurl: string | null
          sortorder: number | null
          variantid: number | null
        }
        Insert: {
          createdat?: string | null
          imageid?: number
          imageurl?: string | null
          sortorder?: number | null
          variantid?: number | null
        }
        Update: {
          createdat?: string | null
          imageid?: number
          imageurl?: string | null
          sortorder?: number | null
          variantid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variantimages_variantid_fkey"
            columns: ["variantid"]
            isOneToOne: false
            referencedRelation: "productvariants"
            referencedColumns: ["variantid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
