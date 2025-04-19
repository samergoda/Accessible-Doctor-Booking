interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
      {description && <p className="mt-2 text-sm text-gray-500 max-w-2xl">{description}</p>}
    </div>
  );
};

export default PageHeader;
