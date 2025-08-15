"use client";

import { signUp } from "supertokens-web-js/recipe/emailpassword";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Use supertokens to login and maintenance the login users
export default function Login() {
    async function signUpClicked(email: string, password: string) {
        try {
            let response = await signUp({
                formFields: [{
                    id: "email",
                    value: email
                }, {
                    id: "password",
                    value: password
                }]
            })

            if (response.status === "FIELD_ERROR") {
                // one of the input formFields failed validation
                response.formFields.forEach(formField => {
                    if (formField.id === "email") {
                        // Email validation failed (for example incorrect email syntax),
                        // or the email is not unique.
                        window.alert(formField.error)
                    } else if (formField.id === "password") {
                        // Password validation failed.
                        // Maybe it didn't match the password strength
                        window.alert(formField.error)
                    }
                })
            } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
                // the reason string is a user friendly message
                // about what went wrong. It can also contain a support code which users
                // can tell you so you know why their sign up was not allowed.
                window.alert(response.reason)
            } else {
                // sign up successful. The session tokens are automatically handled by
                // the frontend SDK.
                window.location.href = "/homepage"
            }
        } catch (err: any) {
            if (err.isSuperTokensGeneralError === true) {
                // this may be a custom error message sent from the API by you.
                window.alert(err.message);
            } else {
                window.alert("Oops! Something went wrong.");
            }
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </>
    )
}