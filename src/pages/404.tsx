import React from "react";
import {injectIntl} from "gatsby-plugin-intl";
import {Helmet} from "react-helmet";
import Layout from "../components/layout";
import {graphql} from "gatsby";
import get from "lodash/get";

function NotFound(props: any) {
	const siteTitle = get(this, "props.data.site.siteMetadata.title");
	return (
		<Layout>
			<Helmet title={`${props.intl.messages.notfound.title} | ${siteTitle}`} />
			<h2>{props.intl.messages.notfound.description}</h2>
		</Layout>
	);
}

export default injectIntl(NotFound);

export const pageQuery = graphql`
	query NotFoundQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
