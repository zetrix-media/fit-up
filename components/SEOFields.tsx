import FormInput from './FormInput';
import FormTextarea from './FormTextarea';

const SEOFields = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="SEO URL" name="seoUrl" />
        <FormInput label="SEO Title" name="seoTitle" />
        <FormTextarea label="SEO Keywords" name="seoKeywords" />
        <FormTextarea label="SEO Description" name="seoDescription" />
      </div>
    );
  };
  
  export default SEOFields;
  