import { CenteredContent, NoticeBox } from '@dhis2/ui';
import * as PropTypes from 'prop-types';
import React from 'react';

const Notice = ({ title, message }) => (
    <CenteredContent position="top">
        <div className="noticeContainer">
            <NoticeBox title={title} warning>
                {message}
            </NoticeBox>
        </div>
    </CenteredContent>
);

Notice.propTypes = { title: PropTypes.string, message: PropTypes.string };

export default Notice;
