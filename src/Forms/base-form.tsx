import { reduxSet as apiAC } from "@clearsummit/radio-dispatch";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { connect } from "react-redux";
import * as yup from "yup";

import { StoreState } from "@/types";

import { Body } from "../components";
import { ButtonProps } from "../components/buttons";
import services from "../helpers/services";
import Strings from "../localization";
import selectors from "../selectors";
import { Colors } from "../theme";
import { Container } from "./styles";

const { useEffect, cloneElement, isValidElement, useState } = React;

interface FormProps {
  /** FormKey to grab and reset submissions errors in the store and get pending / error state */
  formKey: keyof typeof services;
  /** Initial values to populate the form */
  initialValues: any;
  /** Style added to the View around the form fields */
  containerStyle?: ViewStyle | null | undefined;
  /** Children can be used to render form fields */
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
  /** Styled submit button */
  SubmitButton:
    | React.FunctionComponent<ButtonProps>
    | ((props: ButtonProps) => JSX.Element);
  /** Submit Button Text */
  submitTitle: string;
  /** Yup schema used to validate form inputs */
  validationSchema: yup.Schema<any>;
  /** Function with curried access to the model being updated that returns the request payload */
  onSubmitPayload?: (data: any) => ApiPayloadType<any>;
  /** Optional function which overrides the default onSubmit action */
  onSubmit?: (data: any) => void;
  /** Optional boolean to disable the submit button when external logic exists */
  disabledSubmit?: boolean;
  /** Optional boolean to enable re-render the form when initial values change */
  enableReinitialize?: boolean;
  /** Optional ref to have access to formik values */
  formRef?: React.Ref<FormikProps<any>>;
  /** Function with curried access to the model being updated that returns the request payload */
  handleIsValidChange?: (values: { key: string }, isValid: boolean) => void;
}
interface StateToProps {
  /** An optional error to be displayed between the form fields and submission button */
  formError: string | null;
  /** Form submission pending or not  */
  pending: boolean;
}
interface DispatchToProps {
  /** Dispatch request payload */
  makeRequest: (payload: ApiPayloadType<any>) => void;
  /** Dispatch to clear store errors on unmount */
  clearError: (key: string) => void;
}

type Props = FormProps & StateToProps & DispatchToProps;

const renderField = (
  Comp: any,
  onSubmitEditing: (data: any) => void,
  setRef: () => void,
  last: boolean,
  index: number
) => {
  if (isValidElement(Comp)) {
    return cloneElement(Comp, {
      // @ts-ignore
      onSubmitEditing,
      setRef,
      key: `${Comp.props.name}-${index}`,
    });
  }
  return Comp;
};

const BaseForm = (props: Props) => {
  const {
    onSubmitPayload,
    initialValues,
    validationSchema,
    clearError,
    formError,
    containerStyle,
    formKey,
    SubmitButton,
    children,
    submitTitle,
    pending,
    makeRequest,
    onSubmit,
    disabledSubmit,
    formRef,
    enableReinitialize,
    handleIsValidChange,
  } = props;
  useEffect(() => () => clearError(formKey), []);

  const [refs, setStateRefs] = useState([]);
  const setRefs = (ref: TextInput, idx: number) => {
    if (!refs[idx] && ref) {
      // @ts-ignore
      refs[idx] = ref;
      setStateRefs(refs);
    }
  };

  const handleFocus = (idx: number) => () => {
    const ref: TextInput = refs[idx];
    if (ref) {
      ref.focus();
    }
  };
  const handleOnSubmit = (data: unknown) => {
    if (onSubmit) {
      onSubmit(data);
    } else if (onSubmitPayload) {
      const payload = onSubmitPayload(data);
      makeRequest(payload);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
      innerRef={formRef}
      validateOnMount
      enableReinitialize={enableReinitialize}
    >
      {({ handleSubmit, setFieldTouched, isValid, values }) => {
        useEffect(() => {
          if (handleIsValidChange) {
            handleIsValidChange(values, isValid);
          }
        }, [isValid, handleIsValidChange]);

        const onTouchedHandleSubmit = () => {
          Object.keys(initialValues).forEach((key) => {
            setFieldTouched(key);
          });
          handleSubmit();
        };

        return (
          <div style={containerStyle}>
            <div>
              {/* @ts-ignore */}
              {Array.isArray(children)
                ? children.map((c, idx) =>
                    renderField(
                      c,
                      handleFocus(idx + 1),
                      (
                        (index: number) => (ref: TextInput) =>
                          setRefs(ref, index)
                      )(idx),
                      idx === children.length - 1,
                      idx
                    )
                  )
                : children}
              {formError ? (
                <div color={Colors.error}>
                  {typeof formError === "string"
                    ? formError
                    : Strings.general.formErrors}
                </div>
              ) : null}
            </div>
            {!handleIsValidChange && (
              <div>
                <button
                  style={{ marginTop: 35 }}
                  onClick={onTouchedHandleSubmit}
                  disabled={disabledSubmit || pending || !isValid}
                >
                  submitTitle
                </button>
              </div>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: StoreState, props: FormProps) => ({
  formError: selectors.api.getError(state, props.formKey),
  pending: selectors.api.getPending(state, props.formKey),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearError: (key: string) => dispatch(apiAC.clearError.dispatch(key)),
  makeRequest: (payload: any) => dispatch(apiAC.makeRequest.dispatch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);
