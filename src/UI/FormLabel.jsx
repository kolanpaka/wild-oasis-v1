import Input from "./Input";
import Grid, { Col } from "./Grid";

export default function FormLabel({
  label,
  children,
  args = {},
  errorMessage,
  ratio = "4:4",
  gap = 4,
}) {
  const [labelWidth, inputWidth, errorWidth] = ratio.split(":");

  return (
    <div>
      <Grid className="items-center" gap={gap}>
        <Col tablet={labelWidth} className="text-slate-800">
          <label htmlFor={label} {...args?.label}>
            {label}
          </label>
        </Col>
        <Col tablet={inputWidth}>
          {children ? children : <Input id={label} {...args?.input} />}
        </Col>
        {errorWidth && errorMessage && (
          <Col tablet={errorWidth}>
            <p className="text-red-700" {...args?.errorEle}>
              {errorMessage}
            </p>
          </Col>
        )}
      </Grid>
    </div>
  );
}
