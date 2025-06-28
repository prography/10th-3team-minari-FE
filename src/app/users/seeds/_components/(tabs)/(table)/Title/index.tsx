const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <h5 className="title-sm txt-primary" style={{marginBottom: 16}}>
      {children}
    </h5>
  );
};

export default Title;
